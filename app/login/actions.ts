export interface Login {
  email: string;
  password: string;
}

// Form submission handler
export default async function handleFormSubmit(formData: Login) {
    // "use server";
    const email = formData.email
    const password = formData.password

    try {
      // Construct the JSON payload
      const payload = {
        email,
        password,
      };
  
      // Send data to the API route using fetch
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      });
  
      if (!response.ok) {
        const result = await response.json();
        console.log(result)
        return {
          error: result.message || 'An error occurred',
          status: response.status,
          statusText: response.statusText,
        };
      }
  
      const data = await response.json();
      window.location.href = '/doctor/dashboard';
      console.log('Login response:', data);
      return data;
      // Handle success (e.g., navigate, store tokens, etc.)
    } catch (error) {
      console.error('Error:', error);
      return error;
      // Handle error (e.g., display error message)
    }
  }