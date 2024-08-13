// Form submission handler
export async function handleFormSubmit(formData: FormData) {
    "use server";
    const hName = formData.get('hname') as string;
    const hEmail = formData.get('hemail') as string;
    const hPhone = formData.get('hphone') as string;

    // await signIn("Credentials", { email, password });
}

