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
            <p>Head Office & Retail</p>
            <p>Office 1203</p>
            <p>Arenco Tower, Dubai Media City, Dubai, United Arab Emirates.</p>
            <p>Phone: +971 40 368 8080</p>
            <p>Email: info@mgpartners.ae</p>
            <div class="contact-us__social-media">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
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
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from "vue"

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
  }

  &__form-title,
  &__info-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__form-description {
    font-size: 1rem;
    margin-bottom: 2rem;
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
  }

  &__form-group input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--color-secondary);
  }

  &__form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    font-size: 1rem;
  }

  &__info-content p {
    margin: 0.5rem 0;
  }

  &__social-media {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  &__social-media a {
    color: var(--color-white);
    text-decoration: none;
  }

  &__image-section {
    display: flex;
    justify-content: end;
  }

  &__image-section img {
    max-width: 100%;
    height: auto;
  }
}
</style>
