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
    const {
      name,
      email,
      learneremail,
      registrationNumber,
      password,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanLearnerEmail = learneremail.toLowerCase().trim();

    // 🔍 1. Check for existing email
    const { data: emailExists } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (emailExists) {
      return { success: false, error: "Email already registered" };
    }

    // 🔍 2. Check learner email
    const { data: learnerExists } = await supabase
      .from("profiles")
      .select("id")
      .eq("learneremail", cleanLearnerEmail)
      .maybeSingle();

    if (learnerExists) {
      return { success: false, error: "Learner email already registered" };
    }

    // 🔍 3. Check registration number
    const { data: regExists } = await supabase
      .from("profiles")
      .select("id")
      .eq("registration_number", registrationNumber)
      .maybeSingle();

    if (regExists) {
      return {
        success: false,
        error: "Registration number already exists",
      };
    }

    // ✅ 4. Create auth user
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      return { success: false, error: "User creation failed" };
    }

    // ✅ 5. Insert into profiles
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        name,
        email: cleanEmail,
        learneremail: cleanLearnerEmail,
        registration_number: registrationNumber,
        created_at: new Date(),
      },
    ]);

    if (insertError) {
      return {
        success: false,
        error: "Could not save user profile",
      };
    }

    return { success: true, user };
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