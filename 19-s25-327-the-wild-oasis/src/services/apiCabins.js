import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabaseBaseUrl = supabaseUrl || "http://127.0.0.1:54341";
  const hasImagePath = newCabin.image?.startsWith?.(supabaseBaseUrl); //we already have the image in supabase do not require to de upload.

  // console.log("newCabin", newCabin);
  const imageName = hasImagePath
    ? ""
    : `${new Date().getTime()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseBaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    const insertPayload = { ...newCabin, image: imagePath };
    // console.log("INSERT PAYLOAD", JSON.stringify(insertPayload, null, 2));
    query = query.insert([insertPayload]); // this works because names matches with table cols
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be added");
  }

  /** 2 upload image */
  if (hasImagePath) return data; //no need to upload the image, we are done here.

  // http://127.0.0.1:54341/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (imageError) {
    //3  Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw new Error(
      "Cabin image could`t be uploaded, the cabin was not created.",
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
