import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-$${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const supabaseBaseUrl = supabaseUrl || "http://127.0.0.1:54341";

  const imagePath = `${supabaseBaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]); // this works because names matches with table cols
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be added");
  }

  /** 2 upload image */
  // http://127.0.0.1:54341/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (imageError) {
    //3  Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw new Error(
      "Cabin image could\`t be uploaded, the cabin was not created.",
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(`Cabin with id ${id} could not be deleted`);
  }
  return data;
}
