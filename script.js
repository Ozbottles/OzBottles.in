const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const enquiryForm = document.getElementById("enquiry-form");
const formStatus = document.getElementById("form-status");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(enquiryForm);
    const submitButton = enquiryForm.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent ?? "Submit Enquiry";

    formData.append("_subject", "Customer Enquiry - Oz Bottles");
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/ajayagrawal.1195.2024@hinducollege.ac.in", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      if (formStatus) {
        formStatus.textContent = "Enquiry submitted successfully.";
        formStatus.classList.add("success");
      }

      enquiryForm.reset();
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = "Unable to submit right now. Please try again.";
        formStatus.classList.add("error");
      }
      console.error(error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}
