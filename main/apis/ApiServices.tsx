
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
        console.log("formdata===========", formdata)


        const auditorSignatureFile = {
            uri: "file:///data/user/0/com.uksica/cache/rn_image_picker_lib_temp_4eae014b-2e00-4789-b890-a5aa91dc429e.jpg", // Your file URI
            name: "auditor_signature.jpg", // The file name
            type: "image/jpeg", // MIME type
        };

        const formdata1 = new FormData();

        formdata1.append("StoreName", "Test Store 2");
        formdata1.append("Address", "abc 2");
        formdata1.append("Size_Of_Store", "2");
        formdata1.append("Number_of_Security_Guards_Onsite", "4");
        formdata1.append("SIA_Badge_Visible_on_first_guard", "Y");
        formdata1.append("Company_Brand_Logo_Visible_on_Guard", "Y");
        formdata1.append("Names_and_SIA_number_of_Guards", "121a1a");
        formdata1.append("Manager_Person_Spoken_To", "Yesis");
        formdata1.append("Position", "MANAGER");
        formdata1.append("Was_the_Manager_Person_aware_of_Security_Proc", "N");
        formdata1.append("Is_GDPR_Controller_Information_Available_Onsite", "C");
        formdata1.append("Is_the_CCTV_Warning_Sign_Displayed", "P");
        formdata1.append("Security_Guards_Behavior_and_Professionalism", "E");
        formdata1.append("Response_Time_of_Guards_to_Issues", "D");
        formdata1.append("Additional_Observations", "NO Observations");
        formdata1.append("Are_There_Any_Issues", "Y");
        formdata1.append("Issues_Details", "HAHAHAHAHA");
        formdata1.append("Overall_Security_Rating", "E");
        formdata1.append("Auditor_Name", "Bilal");

        // Append the file using the URI and other details
        formdata1.append(
            "Auditor_Signature_File",
            {
                uri: auditorSignatureFile.uri,
                type: auditorSignatureFile.type, // MIME type
                name: auditorSignatureFile.name, // File name
            }
        );
        console.log("formDatta1=========",formdata1)
        const requestOptions: any = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        const response = await fetch(url, requestOptions);
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error submitting form data:", error);
    }
};





