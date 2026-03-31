import { supabase } from "../lib/supabase";

export const registerUser = async (formData) => {
  try {
    const {
      email,
      password,
      name,
      learneremail,
      registrationNumber,
    } = formData;

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          learneremail,
          registrationNumber,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "User creation failed" };
    }

    // 2️⃣ Insert into profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          name,
          email,
          learneremail,
          registration_number: registrationNumber,
        },
      ]);

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "Something went wrong" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "Something went wrong" };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: "Something went wrong" };
  }
};

export const getUserProfile = async () => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData.user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  } catch (err) {
    return { success: false, error: "Something went wrong" };
  }
};

export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: "Logout failed" };
  }
};