const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li")
    totalNavList = navList.length;
    allSection = document.querySelectorAll("section"),
    totalSection = allSection.length;
    for(let i=0; i<totalNavList; i++)
    {
        const a = navList[i].querySelector("a")
        a.addEventListener("click", function()
        {
            for(let j=0; j<totalNavList; j++)
            {
                navList[j].querySelector("a").classList.remove("active")
            }
            this.classList.add("active")
            showSection(this);
        })
    }

    document.getElementById("sendEmailBtn").addEventListener("click", function () {
        emailjs.init("iqVdpsORlZsB-Jvi9"); // Replace with your EmailJS Public Key
    
        let name = document.querySelector("input[placeholder='Name']").value;
        let email = document.querySelector("input[placeholder='Email']").value;
        let subject = document.querySelector("input[placeholder='Subject']").value;
        let message = document.querySelector("textarea[placeholder='Message']").value;
    
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }
    
        let templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
    
        emailjs.send("service_jify6ob", "template_r9c9clq", templateParams)
            .then(function (response) {
                alert("Email sent successfully!");
                console.log("Success:", response);
            })
            .catch(function (error) {
                alert("Failed to send email.");
                console.error("Error:", error);
            });
    });
    