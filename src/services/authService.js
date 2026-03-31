import { supabase } from "../lib/supabase";

/**
 * Auth Service - Minimal backend integration layer
 * Backend team can easily modify Supabase calls here
 */

// Login with email and password
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password,
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Register new user
export const registerUser = async (formData) => {
  try {
    const { name, email,learneremail, registrationNumber, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    // Create auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password: password,
    });

    if (authError) throw authError;

    // Optional: Store additional user data in a users table
    // Backend team can customize this table structure
    if (authData.user) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          name,
          email,
          learneremail,
          registration_number: registrationNumber,
          created_at: new Date(),
        },
      ]);

      if (insertError) console.warn("Could not insert user data:", insertError);
    }

    return { success: true, user: authData.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Password reset
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
