
export const postData = async (url: any, formDataFields: any) => {
    try {
        const formdata = new FormData();

        for (const key in formDataFields) {
            if (formDataFields.hasOwnProperty(key)) {
                if (formDataFields[key] instanceof Array) {
                    formDataFields[key].forEach((file) => {
                        formdata.append(key, {
                            uri: file.uri,
                            name: file.name,
                            type: file.type,
                        });
                    });
                } else {
                    formdata.append(key, formDataFields[key]);
                }
            }
        }

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error submitting form data:", error);
    }
};





