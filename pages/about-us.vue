<template>
  <div class="about-us-page">
    <header class="about-us-page__header">
      <h1 class="about-us-page__title">MG PARTNERS : YOUR TRUSTWORTHY PARTNER</h1>
      <p class="about-us-page__subtitle">
        At MG Partners, we’re synonymous with reliability and trustworthiness in real estate. Our commitment is steadfast: to keep you informed, whether it’s about promising opportunities or potential pitfalls. Just as the industry’s best, we pride ourselves on being a beacon of reliability. With a keen eye for discerning the best deals and a dedication to transparency, we ensure that every step of your real estate journey is guided by integrity.
      </p>
    </header>
    <div class="about-us-page__body">
      <section class="about-us-page__section">
        <div class="about-us-page__text">
          <h2>ELITE CONNECTIONS, EXPERT INSIGHT</h2>
          <p>
            MG Partners has over two decades of experience and brings unique expertise to the table, particularly in our seamless collaboration with international partners. We offer a curated selection of luxury properties coupled with unparalleled service. Our team of specifically selected experts ensures expert guidance every step of the way. At MG Partners, we excel in the prime and super-prime real estate market, leveraging our global network to consistently deliver exceptional service. Each member of our team contributes their wealth of expertise and skills, fostering collaboration and synergy to ensure our clients' success. Additionally, we maintain exclusive and privileged contacts with developers, enhancing our ability to secure the finest properties for our clients.
          </p>
        </div>
        <div class="about-us-page__image">
          <img src="/img/aboutus1.jpg" alt="Elite Connections" />
        </div>
      </section>
      <section class="about-us-page__section">
        <div class="about-us-page__image">
          <img src="/img/aboutus2.jpg" alt="On-Demand and On-Location" />
        </div>
        <div class="about-us-page__text">
          <h2>ON-DEMAND AND ON-LOCATION</h2>
          <p>
            As a key player in the luxury real estate industry worldwide, MG Partners is dedicated to providing tailor-made services across the globe, utilizing our exclusive network to offer a personalized touch to every endeavor. Our commitment to each client ensures top-tier guidance and recommendations to facilitate optimal property choices. Leveraging cutting-edge marketing strategies and advanced technology, we ensure your luxury property stands out prominently, attracting the most relevant buyers.
          </p>
        </div>
      </section>
      <section class="about-us-page__section">
        <div class="about-us-page__text">
          <h2>PROUD HERITAGE</h2>
          <p>
            As a part of the globally renowned MG brand, MG Partners upholds an unparalleled reputation for excellence. Our unique heritage guarantees clients that they are collaborating with a reliable partner capable of delivering top-tier exposure and unparalleled service.
          </p>
        </div>
        <div class="about-us-page__image">
          <img src="/img/aboutus3.jpg" alt="Proud Heritage" />
        </div>
      </section>
      <section class="about-us-page__section">
        <div class="about-us-page__image">
          <img src="/img/aboutus4.jpg" alt="Enhancing Value" />
        </div>
        <div class="about-us-page__text">
          <h2>ENHANCING VALUE THROUGH EXEMPLARY STANDARDS</h2>
          <p>
            Wherever you may be, the MG Partners team possesses the skill to actualize your aspirations within the sphere of luxury real estate. Beyond their extensive proficiency in local and global residential sales, our experts can provide support across diverse domains such as rentals, property management, new development sales, investment, and portfolio management. At MG Partners, we advocate for a distinctive perspective on luxury real estate—one that places the client at the core of all our endeavors.
          </p>
        </div>
      </section>
      <footer class="about-us-page__footer">
        <p>OUR LEGACY. OUR TRADITION. YOUR BENEFIT.</p>
      </footer>
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
      }
    });
  }, {
    threshold: 0.1
  })

  document.querySelectorAll('.about-us-page__section').forEach((section) => {
    observer.observe(section)
  })
})
</script>

<style lang="scss">
.about-us-page {
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
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  &__subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-quaternary);
    width: 74rem;
    margin: 0 auto;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    opacity: 1;

    &:nth-child(even) {
      animation-delay: 1s;
    }

    &:nth-child(odd) {
      .about-us-page__text {
        order: 1;
        background-color: var(--color-quaternary);
        animation: slideInLeft 3s forwards;
        animation-timeline: view();
        animation-range: 10px 600px;
      }
      .about-us-page__image {
        order: 2;
      }
    }

    &:nth-child(even) {
      .about-us-page__text {
        background-color: var(--color-white);
        color: var(--color-quaternary);
        padding-top: 2rem;
        animation: slideInRight 3s forwards;
        animation-timeline: view();
        animation-range: 10px 600px;
      }
      .about-us-page__image {
        animation: slideInLeft 1s forwards;
      }
    }

    &:first-child {
      .about-us-page__text,
      .about-us-page__image {
        animation: none;
      }
    }
  }

  &__text {
    background-color: var(--color-quaternary);
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    color: var(--color-white);

    h2 {
      font-size: 2.3rem;
      margin-bottom: 1rem;
      font-weight: 400;
      letter-spacing: 0.2rem;
    }

    p {
      font-size: 1.43rem;
    }
  }

  &__image {
    display: flex;
    justify-content: center;
    
    img {
      width: 100%;
      height: auto;
      max-width: 1000px;
      max-height: 1000px;
      object-fit: cover;
    }
  }

  &__footer {
    text-align: center;
    font-size: 1.8rem;
    color: var(--color-quaternary);
    margin-top: 4rem;
    margin-bottom: 4rem;
    font-weight: 500;
    letter-spacing: 0.4rem;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
