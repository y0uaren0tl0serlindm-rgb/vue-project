<template>
  <section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-shade" aria-hidden="true"></div>

    <div class="hero-center">
      <h1 class="oblivion-lockup" aria-label="Oblivionis 吾 毋惧忘却">
        <span class="oblivion-latin">Oblivionis</span>

        <span class="oblivion-cn">
          <span class="oblivion-ware">吾</span>
          <span class="oblivion-main">毋惧忘却</span>
        </span>
      </h1>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: min(72vh, 760px);
  position: relative;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 36px;
  padding: clamp(24px, 5vw, 64px);

  background: #07080c;
  box-shadow: 0 28px 100px rgba(0, 0, 0, 0.54);

  overflow: hidden;
  isolation: isolate;
}

/* 背景图层 */
.hero-bg {
  position: absolute;
  inset: -18px;
  z-index: 0;

  background-image: url('@/assets/images/sachiko-stage.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  transform: scale(1.04);
  filter: brightness(0.78) saturate(0.96) contrast(1.06);
  opacity: 0.94;
}

/* 遮罩层 */
.hero-shade {
  position: absolute;
  inset: 0;
  z-index: 1;

  background:
    linear-gradient(
      90deg,
      rgba(5, 6, 10, 0.9) 0%,
      rgba(5, 6, 10, 0.76) 28%,
      rgba(5, 6, 10, 0.34) 56%,
      rgba(5, 6, 10, 0.4) 100%
    ),
    linear-gradient(
      180deg,
      rgba(5, 6, 10, 0.18) 0%,
      rgba(5, 6, 10, 0.38) 52%,
      rgba(5, 6, 10, 0.72) 100%
    ),
    radial-gradient(
      circle at 66% 22%,
      rgba(210, 220, 255, 0.24),
      transparent 34%
    );
}

/* 暗角 */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  background:
    radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 42%,
      rgba(0, 0, 0, 0.44) 100%
    ),
    radial-gradient(
      circle at 64% 28%,
      rgba(210, 220, 255, 0.08),
      transparent 30%
    );
}

/* 细颗粒 */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;

  opacity: 0.018;
  background-image: radial-gradient(circle, #fff 0 0.45px, transparent 0.8px);
  background-size: 10px 10px;
}

/* 文字定位 */
.hero-center {
  position: absolute;
  left: clamp(24px, 4.5vw, 78px);
  top: 50%;
  z-index: 4;

  width: min(620px, 52vw);

  transform: translateY(-50%);
}

/* 标题组合 */
.oblivion-lockup {
  margin: 0;

  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  gap: clamp(18px, 2.8vw, 44px);
}

.oblivion-latin {
  position: relative;

  writing-mode: vertical-rl;
  text-orientation: mixed;

  color: rgba(238, 241, 235, 0.46);

  font-family:
    Georgia,
    'Times New Roman',
    serif;

  font-size: clamp(14px, 1.25vw, 22px);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  padding-block: 10px;
}

/* 这里的 ::after 是给 Oblivionis 右侧生成一条装饰竖线 */
.oblivion-latin::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -18px;

  width: 1px;
  height: clamp(90px, 13vw, 160px);

  transform: translateY(-50%);

  background: linear-gradient(
    180deg,
    transparent,
    rgba(238, 241, 235, 0.22),
    transparent
  );
}

.oblivion-cn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.oblivion-ware {
  margin-bottom: clamp(6px, 0.8vw, 12px);

  color: rgba(238, 241, 235, 0.62);

  font-family:
    'Noto Serif SC',
    'Source Han Serif SC',
    'Songti SC',
    'SimSun',
    serif;

  font-size: clamp(24px, 2.8vw, 46px);
  font-weight: 300;
  letter-spacing: 0.2em;
}

.oblivion-main {
  color: #f5f2ea;

  font-family:
    'Noto Serif SC',
    'Source Han Serif SC',
    'Songti SC',
    'SimSun',
    serif;

  font-size: clamp(52px, 6.6vw, 104px);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.035em;

  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.14),
    0 0 32px rgba(255, 255, 255, 0.08),
    0 0 72px rgba(150, 170, 255, 0.1);
}

/* 手机端 */
@media (max-width: 720px) {
  .hero {
    min-height: 620px;
    border-radius: 26px;
    padding: 22px 18px;
  }

  .hero-bg {
    inset: 0;
    transform: none;

    background-size: auto 100%;
    background-position: 70% center;

    filter: brightness(0.78) saturate(0.96) contrast(1.06);
    opacity: 0.95;
  }

  .hero-shade {
    background:
      linear-gradient(
        180deg,
        rgba(5, 6, 10, 0.38) 0%,
        rgba(5, 6, 10, 0.58) 42%,
        rgba(5, 6, 10, 0.86) 100%
      ),
      radial-gradient(
        circle at 62% 18%,
        rgba(210, 220, 255, 0.18),
        transparent 30%
      );
  }

  .hero-center {
    left: 50%;
    top: 50%;

    width: 100%;

    transform: translate(-50%, -50%);
    text-align: center;
  }

  .oblivion-lockup {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .oblivion-latin {
    writing-mode: horizontal-tb;

    font-size: 15px;
    letter-spacing: 0.28em;

    padding: 0;
    transform: translateX(0.14em);
  }

  .oblivion-latin::after {
    display: none;
  }

  .oblivion-cn {
    align-items: center;
  }

  .oblivion-ware {
    margin-bottom: 8px;

    font-size: 28px;
    letter-spacing: 0.18em;

    transform: translateX(0.09em);
  }

  .oblivion-main {
    font-size: clamp(48px, 14vw, 68px);
    line-height: 1;
    letter-spacing: -0.03em;
  }
}
</style>