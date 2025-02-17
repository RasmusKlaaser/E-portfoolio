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

    

//github api skill
    async function updateSkillPercentages() {
        const username = "RasmusKlaaser"; // Your GitHub username
        const skillMap = {
            "JavaScript": "Javascript",
            "HTML": "HTML",
            "CSS": "CSS",
            "Python": "Python"
        };
    
        try {
            let response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            let repos = await response.json();
    
            let languageStats = {};
            let totalBytes = 0;
    
            // Fetch language breakdown per repository
            for (let repo of repos) {
                let langResponse = await fetch(repo.languages_url);
                let langData = await langResponse.json();
    
                for (let lang in langData) {
                    if (!languageStats[lang]) {
                        languageStats[lang] = 0;
                    }
                    languageStats[lang] += langData[lang]; // Sum up bytes of code
                    totalBytes += langData[lang];
                }
            }
    
            // Convert to percentages
            for (let lang in languageStats) {
                languageStats[lang] = Math.round((languageStats[lang] / totalBytes) * 100);
            }
    
            console.log("GitHub Language Stats:", languageStats);
    
            // Update UI for matched skills
            document.querySelectorAll(".skill-item").forEach((skill) => {
                let skillName = skill.querySelector("h5").textContent.trim(); // Get skill name
                for (let githubLang in languageStats) {
                    if (skillMap[githubLang] === skillName) {
                        let progressBar = skill.querySelector(".progress-in");
                        let percentText = skill.querySelector(".skill-percent");
    
                        if (progressBar && percentText) {
                            progressBar.style.width = `${languageStats[githubLang]}%`;
                            percentText.textContent = `${languageStats[githubLang]}%`;
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
        }
    }
    
    window.onload = function () {
        updateSkillPercentages();
    };
    
// navbar scroller color
function updateActiveNav() {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".nav li a");

    let scrollPosition = window.scrollY + 100; 

    sections.forEach((section) => {
        let top = section.offsetTop;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active"); 
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


// Email send notification
    function showNotification(message, isError = false) {
        let notification = document.getElementById("notification");
        let notificationText = document.getElementById("notification-text");
    
        notificationText.textContent = message;
        notification.classList.remove("hidden"); // Ensure it's visible
        notification.classList.toggle("error", isError);
        notification.classList.add("show");
    
        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                notification.classList.add("hidden"); // Hide after animation
            }, 300); 
        }, 3000);
    }
    
 // Email sender   
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
            showNotification("Email sent successfully!");
        })
        .catch(function (error) {
            showNotification("Failed to send email. Please try again.", true);
            console.error("Error:", error);
        });
        

});

// Scroller
document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        let targetId = this.getAttribute("href").substring(1);
        let targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50, 
            behavior: "smooth"
        });

        // Manually update active class
        document.querySelectorAll(".nav a").forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
    });

    // window pop up
    window.onload = function () {
        function openModal(title, image, description) {
            document.getElementById("modal-title").textContent = title;
            document.getElementById("modal-image").src = image;
            document.getElementById("modal-description").innerHTML = description; // Use innerHTML instead of textContent
            document.getElementById("courseModal").style.display = "flex"; // Show modal
        }
        
    
        
        let closeButton = document.querySelector(".close");
        let modal = document.getElementById("courseModal");
    
        if (closeButton) {
            closeButton.addEventListener("click", function () {
                modal.style.display = "none";
            });
        }
    
       
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    
        
        window.openModal = openModal;
    };
    
    
    

});