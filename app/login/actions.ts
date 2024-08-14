// Form submission handler
export default async function handleFormSubmit(formData: FormData) {
    // "use server";
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    try {
      // Construct the JSON payload
      const payload = {
        email,
        password,
      };
  
      // Send data to the API route using fetch
      const response = await fetch(`${process.env.HOST} /api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
      window.location.href = '/doctor/dashboard';
      console.log('Login response:', data);
      // Handle success (e.g., navigate, store tokens, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message)
    }
  }