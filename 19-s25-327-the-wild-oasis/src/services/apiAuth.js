import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data?.user;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    // console.error(error);
    throw new Error(error.message);
  }
  // console.log("user data", data);
  return data?.user;
}

export async function logout() {
  // console.log("loging you out");
  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  //1- udate the password OR fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //2-  uplaod the avatar image
  const fileName = `avatar-${data.user.id}-${new Date().getTime()}`;

  const { error: storageError } =  await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }

  //3- update the avatar in the user data
  // http://127.0.0.1:54341/storage/v1/object/public/avatars/avatar-01.jpg
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: errorEditAvatar } =
    await supabase.auth.updateUser({ data: { avatar: avatarPath } });

  if (errorEditAvatar) {
    console.error(errorEditAvatar);
    throw new Error(errorEditAvatar.message);
  }
  return updatedUser;
}
