
export interface SignUp {
  name: string;
  email: string;
  password: string;
  role: string;
}


// Form submission handler
export default async function handleFormSubmit(formData: SignUp) {
    // "use server";
    const username = formData.name
    const email = formData.email
    const password = formData.password
    const role = formData.role
    try {
      // Construct the JSON payload
      const payload = {
        username,
        email,
        password,
        role
      };

      // Send data to the API route using fetch
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error || 'Something went wrong');
      }
  
      const data = await response.json();
      window.location.href = '/doctor/dashboard';
      console.log('signup response:', data);
      return data;
      // Handle success (e.g., navigate, store tokens, etc.)
    } catch (error) {
      console.error('Error:', error);
      return error;
      // Handle error (e.g., display error message)
    }
  }