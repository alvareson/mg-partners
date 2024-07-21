<template>
  <div class="contact-us">
    <header class="contact-us__header">
      <h1 class="contact-us__title">CONNECT WITH US</h1>
      <p class="contact-us__subtitle">
        Experience exceptional service with MG Partners. Known for our reliability, expertise, and honesty, we redefine the real estate experience. Our unparalleled attention to detail sets us apart as industry leaders. Trust us to guide you through buying or selling your home on a level unmatched by any other.
      </p>
    </header>
    <div class="contact-us__body">
      <div class="contact-us__container">
        <div class="contact-us__form-section">
          <h2 class="contact-us__form-title">GET IN TOUCH</h2>
          <p class="contact-us__form-description">
            Kindly complete the form below, and your message will promptly reach the appropriate department and staff member. You can expect a response within the next 24 hours.
          </p>
          <form class="contact-us__form">
            <div class="contact-us__form-group">
              <label for="first-name">YOUR FIRST NAME</label>
              <input id="first-name" type="text" placeholder="Enter first name here" />
            </div>
            <div class="contact-us__form-group">
              <label for="last-name">YOUR LAST NAME</label>
              <input id="last-name" type="text" placeholder="Enter last name here" />
            </div>
            <div class="contact-us__form-group">
              <label for="email">EMAIL ADDRESS</label>
              <input id="email" type="email" placeholder="Enter your email address" />
            </div>
            <div class="contact-us__form-group">
              <label for="phone">PHONE</label>
              <input id="phone" type="tel" placeholder="Enter your phone number (international format)" />
            </div>
            <div class="contact-us__form-footer">
              <p>
                By clicking «Submit» you agree to our <a href="#">Privacy Policy</a>
              </p>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
        <div class="contact-us__info-section">
          <h2 class="contact-us__info-title">CONTACTS</h2>
          <address class="contact-us__info-content">
            <p class="contact-us__bold-text">Head Office & Retail</p>
            <p>Office 1203</p>
            <p>Arenco Tower, Dubai Media City, Dubai, United Arab Emirates.</p>
            <div class="contact-us__phone">
              <p class="contact-us__bold-text">Phone</p>
              <p>+971 40 368 8080</p>
            </div>
            <div class="contact-us__email">
              <p class="contact-us__bold-text">Email</p>
              <p>info@mgpartners.ae</p>
            </div>
            <div class="contact-us__social">
              <p class="contact-us__bold-text">Social media</p>
              <div class="contact-us__social-media">
                <Icon name="facebook" width="31" height="24" />
                <Icon name="instagram" width="31" height="24" />
                <Icon name="x" width="31" height="24" />
                <Icon name="linkedin" width="31" height="24" />
              </div>
            </div>
          </address>
        </div>
        <div class="contact-us__image-section">
          <img src="/img/image2.jpg" alt="Contact Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  document.querySelectorAll('.contact-us__header, .contact-us__body, .contact-us__form-section, .contact-us__info-section, .contact-us__image-section').forEach((section) => {
    observer.observe(section)
  })
})
</script>

<style lang="scss">
.contact-us {
  background: var(--color-white);
  padding: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    background: var(--color-white);

    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--color-quaternary);
  }

  &__subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: var(--color-quaternary);
    width: 70rem;
    margin: 0 auto;
  }

  &__body {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
    transition-delay: 0.5s;
  }

  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    width: 100%;
    background: var(--color-quaternary);
  }

  &__form-section,
  &__info-section {
    padding: 2rem;
    color: var(--color-white);

    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
    transition-delay: 0.7s;
  }

  &__info-section {
    padding-left: 8rem;
  }

  &__info-title {
    padding-left: 1rem;
  }

  &__form-title,
  &__info-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__form-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 26rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__form-group {
    display: flex;
    flex-direction: column;
  }

  &__form-group label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: var(--color-white);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__form-group input {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid var(--color-secondary);
    background: transparent;
    color: var(--color-white);
  }

  &__form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__bold-text {
    font-weight: bold;
    margin: 0.8rem 0;
  }

  &__phone,
  &__email,
  &__social {
    margin-top: 2rem;
  }

  &__form-footer p {
    font-size: 0.75rem;
  }

  &__form-footer button {
    padding: 0.75rem 1.5rem;
    background-color: var(--color-secondary);
    color: var(--color-white);
    border: none;
    cursor: pointer;
  }

  &__info-content {
    font-size: 1.2rem;
  }

  &__info-content p {
    margin: 0.2rem 0;
  }

  &__social-media {
    display: flex;
    gap: 1rem;
  }

  // &__social {
  //   padding-top: 0.2rem;
  // }

  &__social-media svg {
    margin-top: 0.8rem;
  }

  &__image-section {
    display: flex;
    justify-content: end;

    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
    transition-delay: 0.9s;
  }

  &__image-section img {
    max-width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: no-preference) {
    &__header.is-visible,
    &__body.is-visible,
    &__form-section.is-visible,
    &__info-section.is-visible,
    &__image-section.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
