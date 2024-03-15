export const useSendForm = async (formFields, formFiles=null) => {

    const formData = new FormData();
    for (const key in formFields) {
        if (Object.hasOwnProperty.call(formFields, key)) {
            const item = formFields[key];
            formData.append(key, item);
        }
    }
    if (formFiles) {
        for (let i = 0; i < formFiles.value.length; i++) {
            formData.append("files[" + i + "]", formFiles.value[i]);
        }

    }

    const {
        error,
        data
    } = await useFetch("/api/send", {
        method: "POST",
        body: formData,
    });
    if (!error.value) {
       await navigateTo('/thank-you')
        return data
    } else {
        return error
    }

}