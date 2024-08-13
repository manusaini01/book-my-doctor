// Form submission handler
export default async function handleFormSubmit(formData: FormData) {
    // "use server";
    const username = formData.get('username') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;
  
    try {
      // Construct the JSON payload
      const payload = {
        username,
        email,
        password,
        phone,
        role
      };
      console.log(payload, "ok")

      // Send data to the API route using fetch
      const response = await fetch('http://localhost:3000/api/auth/signup', {
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
      console.log('signup response:', data);
      // Handle success (e.g., navigate, store tokens, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message)
    }
  }