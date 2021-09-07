import React from "react";
import { Style } from "react-style-tag";

export const Thing = () => {
  return (
    <body>
      <div className="global">
        <div className="html w-embed">
          <Style>{`
          .c-stroke-wrapper{
            width: calc(100% - 100px);
            }
    
            .c-card-bg{
              background: radial-gradient(99.31% 94.34% at 49.88% -2.58%, rgba(232, 186, 115, 0.15) 0%, rgba(232, 186, 115, 0) 72.18%), #15171A;
              border-radius: 16px;}
    
            /* Blending modes */
            .mbm-normal{mix-blend-mode: normal;}
            .mbm-multiply{mix-blend-mode: multiply;}
            .mbm-screen{mix-blend-mode: screen;}
            .mbm-overlay{mix-blend-mode: overlay;}
            .mbm-darken{mix-blend-mode: darken;}
            .mbm-lighten{mix-blend-mode: lighten;}
            .mbm-color-dodge{mix-blend-mode: color-dodge}
            .mbm-color-burn{mix-blend-mode: color-burn;}
            .mbm-hard-light{mix-blend-mode: hard-light;}
            .mbm-soft-light{mix-blend-mode: soft-light;}
            .mbm-difference{mix-blend-mode: difference;}
            .mbm-exclusion{mix-blend-mode: exclusion;}
            .mbm-hue{mix-blend-mode: hue;}
            .mbm-saturation{mix-blend-mode: saturation;}
            .mbm-color{mix-blend-mode: color;}
            .mbm-luminosity{mix-blend-mode: luminosity;}
    
            /* On screens that are 991px wide or less, */
            @media screen and (max-width: 991px) {
            .c-stroke-wrapper{
            width: calc(100% - 60px);
            }
    
            /* On screens that are 767px wide or less, */
            @media screen and (max-width: 767px) {
            .c-stroke-wrapper{
            width: calc(100% - 30px);
            }
        `}</Style>
        </div>
      </div>
      <nav
        //   style={{
        // -webkit-transform: 'translate3d(0, -200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
        // -moz-transform: translate3d(0, -200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
        // -ms-transform: translate3d(0, -200%, 0) scale3d(1, 1, 1) rotateX(0)
        //   rotateY(0) rotateZ(0) skew(0, 0);
        // transform: translate3d(0, -200%, 0) scale3d(1, 1, 1) rotateX(0)
        //   rotateY(0) rotateZ(0) skew(0, 0);
        // }}
        className="b-nav"
      >
        <div className="b-container is--nav">
          <div className="b-nav__inner">
            <div className="b-nav__spacer"></div>
            <div className="b-row cc-nav">
              <div className="b-nav__left">
                <div
                  data-w-id="98e54bfa-c5c7-dff3-d886-9d2071e848e7"
                  className="ui-button-circle-icon"
                >
                  <div className="ui-button-circle-icon__icons-wr">
                    <div className="ui-button-circle-icon__icon-wr icon">
                      <div className="hamburger">
                        <img
                          src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f64f4e7879bbd847542fce0_watermark1.png"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ui-button-circle-icon__label-wr">Menu</div>
                </div>
                <div className="b-nav__divider"></div>
                <div className="b-nav__links">
                  <a href="/" className="b-nav__link w-inline-block">
                    <div>home</div>
                  </a>
                  <a href="/about" className="b-nav__link w-inline-block">
                    <div>about</div>
                  </a>
                  <a
                    href="/galfond-challenge"
                    className="b-nav__link w-inline-block"
                  >
                    <div>galfond challenge</div>
                  </a>
                </div>
              </div>
              <div className="b-nav__logo">
                <a href="/" className="b-brand-nav w-inline-block">
                  <img
                    src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651cbc54d254a8f6744908_AI-img-21.png"
                    loading="lazy"
                    alt=""
                    className="b-nav-clc-logo"
                  />
                  <div className="div-block-14"></div>
                </a>
              </div>
              <div className="b-nav__right">
                <a href="#" className="b-nav__link-copy w-inline-block">
                  <div>Sign Up Today</div>
                </a>
              </div>
            </div>
            <div className="b-nav__spacer"></div>
          </div>
          <div
            //     style="
            //   -webkit-transform: translate3d(-60px, -60px, 0) scale3d(1, 1, 1)
            //     rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
            //   -moz-transform: translate3d(-60px, -60px, 0) scale3d(1, 1, 1)
            //     rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
            //   -ms-transform: translate3d(-60px, -60px, 0) scale3d(1, 1, 1)
            //     rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
            //   transform: translate3d(-60px, -60px, 0) scale3d(1, 1, 1) rotateX(0)
            //     rotateY(0) rotateZ(0) skew(0, 0);
            //   display: none;
            //   opacity: 0;
            // "
            className="b-menu-parent-slide"
          >
            <div className="navigation__wr">
              <div className="navigation__cols">
                <div className="navigation__products-mobile">
                  <div className="swiper-container-mobile">
                    <img
                      src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651c7d49d4a4c8433a5767_AI-img.png"
                      loading="lazy"
                      sizes="100vw"
                      srcSet="
                    https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651c7d49d4a4c8433a5767_AI-img-p-500.png  500w,
                    https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651c7d49d4a4c8433a5767_AI-img-p-800.png  800w,
                    https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651c7d49d4a4c8433a5767_AI-img.png       1151w
                  "
                      alt=""
                      className="image-5"
                    />
                    <img
                      src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651cbc54d254a8f6744908_AI-img-21.png"
                      loading="lazy"
                      alt=""
                      className="image-4"
                    />
                  </div>
                </div>
                <div className="navigation__col">
                  <ul className="navigation__main-pages w-list-unstyled">
                    <li className="nav-item-to-stag-wr">
                      <a href="/" className="nav-main-page-link w-inline-block">
                        <div>Home</div>
                      </a>
                    </li>
                    <li className="nav-item-to-stag-wr">
                      <a
                        href="/about"
                        className="nav-main-page-link w-inline-block"
                      >
                        <div>About</div>
                      </a>
                    </li>
                    <li className="nav-item-to-stag-wr">
                      <a
                        href="/galfond-challenge"
                        className="nav-main-page-link w-inline-block"
                      >
                        <div>Galfond Challenge</div>
                      </a>
                    </li>
                  </ul>
                  <ul className="navigation__secondary-pages w-list-unstyled">
                    <li className="nav-item-to-stag-wr">
                      <a
                        href="#"
                        className="nav-secondary-page-link w-inline-block"
                      >
                        <div>Terms &amp; Privacy</div>
                      </a>
                    </li>
                    <li className="nav-item-to-stag-wr">
                      <a
                        href="#"
                        className="nav-secondary-page-link w-inline-block"
                      >
                        <div>cookie policy</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bg"></div>
      </nav>
      <div className="site-container">
        <main style={{ opacity: 0 }} className="b-section is--hero wf-section">
          <div className="b-container is--centered">
            <div className="b-header c-centered">
              <div className="b-meta">
                <div>AI-DRIVEN POKER TOURNAMENT TRAINING</div>
              </div>
              <h1 className="h1">
                The most powerful tournament training platform available
              </h1>
              <p className="dk">
                An <strong>AI driven platform</strong> designed to react to YOUR
                game and teach you what you need to work on the most. It
                features personal input from Chance Kornuth and Alex Foxen who
                spent thousands of hours writing explanations to over 3,000
                specific spots. As you answer questions the AI learns exactly
                what you need to work on and adapts to you personally.
              </p>
            </div>
            <div className="div-block-17">
              <div className="w-embed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="24"
                  fill="none"
                  viewBox="0 0 18 24"
                >
                  <path
                    stroke="#E8BA73"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 7v5M17 9.067C17 4.612 13.418 1 9 1S1 4.612 1 9.067v5.866C1 19.388 4.582 23 9 23s8-3.612 8-8.067V9.067z"
                  />
                </svg>
              </div>
              <div className="t-text-muted">Scroll down to learn more</div>
            </div>
            <div className="div-block-44">
              <img
                src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6131f665c5f757819b4376a2_clc-hero.png"
                loading="lazy"
                sizes="(max-width: 479px) 100vw, (max-width: 991px) 720px, (max-width: 1439px) 50vw, 720px"
                srcSet="
              https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6131f665c5f757819b4376a2_clc-hero-p-500.png  500w,
              https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6131f665c5f757819b4376a2_clc-hero-p-800.png  800w,
              https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6131f665c5f757819b4376a2_clc-hero.png       1281w
            "
                alt=""
                className="c-bonus-img"
              />
              <div
                data-w-id="c08e9459-846f-ed7e-edd8-090753e65723"
                className="videocomponent__playcontainer"
              >
                <div className="videocomponent__playborder">
                  <div className="videocomponent__playborderinner"></div>
                </div>
                <div className="videocomponent__playarrow"></div>
              </div>
            </div>
            <div
              style={{ display: "none", opacity: 0 }}
              className="div-block-45"
            >
              <div
                data-w-id="64594b4a-39d6-ad4a-cb36-326372f07378"
                className="videocomponent__closecontainer"
              >
                <div className="videocomponent__playborder">
                  <div className="videocomponent__playborderinner"></div>
                </div>
                <div className="videocomponent__closebutton">
                  <div>X</div>
                </div>
              </div>
              <div className="div-block-46">
                <div className="video-wrapper">
                  <div className="video">
                    <div className="w-embed w-iframe w-script">
                      <iframe
                        title="kjsndkjsdkcjn"
                        src="//fast.wistia.net/embed/iframe/1t6j327wvg?videoFoam=true"
                        allowtransparency="true"
                        frameborder="0"
                        scrolling="no"
                        className="wistia_embed"
                        name="wistia_embed"
                        allowfullscreen
                        mozallowfullscreen
                        webkitallowfullscreen
                        oallowfullscreen
                        msallowfullscreen
                        width="100%"
                        height="100%"
                      ></iframe>
                      <script src="//fast.wistia.net/assets/external/iframe-api-v1.js"></script>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <main className="b-section wf-section">
          <div className="b-container">
            <div className="div-block-20">
              <div className="div-block-19">
                <img
                  src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069d4079c3b85fef17f63ee_clai-1.jpg"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="div-block-26">
                <div className="div-block-19-copy">
                  <img
                    src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069d406a382c12614aa34b5_clai-2.jpg"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="div-block-27">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="48"
                      fill="none"
                      viewBox="0 0 60 48"
                    >
                      <path
                        fill="#E8BA73"
                        d="M23.502 44.279c-5.571 5.18-15.058 3.81-19.5-1.674-5.258-6.478-6.308-18.755 2.851-29.736C11.396 7.42 16.872 3.29 23.273.478l2.953 4.755C17.119 9.646 10.313 15.628 9.348 25.66c4.109 0 7.518-.148 10.554.938 3.457 1.237 5.557 3.531 6.418 6.162 1.367 4.118.705 8.244-2.818 11.519zm33.018 0c-5.571 5.18-15.059 3.81-19.5-1.674-5.258-6.478-6.308-18.755 2.851-29.736C44.414 7.42 49.89 3.29 56.291.478l2.952 4.755C50.137 9.646 43.331 15.628 42.366 25.66c4.109 0 7.518-.148 10.554.938 3.457 1.237 5.557 3.531 6.418 6.162 1.367 4.118.705 8.244-2.818 11.519z"
                      />
                    </svg>
                  </div>
                  <blockquote>
                    We took the lessons we learned while making
                    <span className="t-highlight">$46,621,091 </span>and
                    <span className="t-highlight">
                      winning 41 tournaments
                    </span>{" "}
                    and combined them with world className AI technology to
                    produce the most powerful tournament training platform
                    available.
                  </blockquote>
                  <div className="t-text-muted">-Alex and Chance</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="b-section wf-section">
          <div className="b-container is--vertical">
            <div className="b-meta">
              <div>EXPERIENCE &amp; FEEDBACK + TECHONOLOGY</div>
            </div>
            <div className="w-layout-grid l-grid-middle">
              <div className="div-block-23">
                <h3 className="h3">
                  The Highlights of{" "}
                  <span className="t-highlight">Team CLC</span>
                </h3>
                <div>
                  <div className="div-block-25">
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <p className="paragraph">
                      Our coaches have collectively made over
                      <span className="t-highlight">$46,621,091</span> and have
                      won a combined total of 41 live &amp; online tournaments.
                      <br />
                    </p>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <p className="paragraph">
                      We have won practically every tournament event in poker.
                      <br />
                      Including the
                      <span className="t-highlight">
                        WSOP Main, WPT, Aussie Millions.
                      </span>
                      <br />
                    </p>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <p className="paragraph">
                      CL AI creator Alex Foxen is the
                      <span className="t-highlight">
                        number one GPI player in the world.
                      </span>
                      <br />
                    </p>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <p className="paragraph">
                      We ran one of the largest tournament staking operations
                      and successfully taught
                      <span className="t-highlight">120 players</span> our
                      methods and that resulted in
                      <span className="t-highlight">
                        $12,000,000+ in wins.{" "}
                      </span>
                      <br />
                    </p>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <p className="paragraph">
                      We have experienced all the highs and lows of poker and
                      have built
                      <span className="t-highlight">
                        bankrolls from 0 to well over 10 million.{" "}
                      </span>
                      <br />
                    </p>
                  </div>
                  <div className="c-seperator"></div>
                </div>
              </div>
              <div
                id="w-node-_6067bd9f-86d8-031f-2392-7578274723f4-7de95240"
                className="c-seperator is--vertical"
              ></div>
              <div className="div-block-23-copy">
                <h3 className="h3">
                  The Highlights of{" "}
                  <span className="t-highlight">Technology</span>
                </h3>
                <div className="div-block-33">
                  <div className="div-block-25">
                    <p className="paragraph">
                      Powered by Socrates, an
                      <span className="t-highlight">
                        industry leading AI learning platform
                      </span>
                      <br />
                    </p>
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <p className="paragraph">
                      <span className="t-highlight">
                        Personalized experience,
                      </span>
                      adjusting based on your strengths and areas in need of
                      reinforcement
                      <br />
                    </p>
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <p className="paragraph">
                      Guides users through a
                      <span className="t-highlight">
                        customized learning journey
                      </span>
                      <br />
                    </p>
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <p className="paragraph">
                      <span className="t-highlight">Powerful reporting</span>{" "}
                      helps you identify where to focus
                      <br />
                      to improve your skills
                      <br />
                    </p>
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-seperator"></div>
                  <div className="div-block-25">
                    <p className="paragraph">
                      <span className="t-highlight">Real scenarios</span> - See
                      how you compare to the <br />
                      best players in poker today
                      <br />
                    </p>
                    <div className="circle-yellow">
                      <img
                        src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6069dbee1cff2c4288edce41_human-icon.svg"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-seperator"></div>
                </div>
              </div>
            </div>
            <div className="t-btn">
              <a href="#" className="c-btn-primary cta w-inline-block">
                <div>Sign Up Today</div>
              </a>
              <div className="t-btn--tertiary-line-top">
                <div className="t-btn--tertiary-line-top-before"></div>
                <div className="t-btn--tertiary-line-top-after"></div>
              </div>
              <div className="t-btn--tertiary-line-bottom">
                <div className="t-btn--tertiary-line-bottom-before"></div>
                <div className="t-btn--tertiary-line-bottom-after"></div>
              </div>
            </div>
          </div>
          <img
            src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb271c127593f13b917cc_clai-4.jpg"
            loading="lazy"
            sizes="(max-width: 575px) 100vw, 575px"
            srcSet="
          https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb271c127593f13b917cc_clai-4-p-500.jpeg 500w,
          https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb271c127593f13b917cc_clai-4.jpg        575w
        "
            alt=""
            className="img-clai-3"
          />
          <img
            src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb26f1a4f9e72990fcdfa_clai-3.jpg"
            loading="lazy"
            sizes="(max-width: 608px) 100vw, 608px"
            srcSet="
          https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb26f1a4f9e72990fcdfa_clai-3-p-500.jpeg 500w,
          https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/606cb26f1a4f9e72990fcdfa_clai-3.jpg        608w
        "
            alt=""
            className="img-clai-4"
          />
        </div>
        <div className="b-section cc-60-0 wf-section">
          <div className="b-container is--small is--centered">
            <div className="w-layout-grid div-block-25">
              <div
                id="w-node-_855f8f04-ad39-fba6-d5f6-4753ac1955ee-7de95240"
                className="div-block-29"
              >
                <img
                  src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6070ba5ca3dddf7b89dba2bf_avatar-5.png"
                  loading="lazy"
                  alt=""
                />
                <div className="golden-blur"></div>
                <div className="div-block-30">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="30"
                      fill="none"
                      viewBox="0 0 38 30"
                    >
                      <path
                        fill="#E8BA73"
                        d="M14.939 27.674c-3.482 3.238-9.412 2.382-12.188-1.046C-.535 22.58-1.191 14.907 4.533 8.043c2.84-3.405 6.262-5.986 10.263-7.744l1.845 2.972C10.95 6.029 6.695 9.768 6.093 16.038c2.568 0 4.698-.093 6.596.586 2.16.773 3.473 2.207 4.011 3.85.855 2.575.44 5.153-1.761 7.2zm20.636 0c-3.482 3.238-9.412 2.382-12.188-1.046-3.286-4.048-3.942-11.721 1.783-18.585 2.839-3.405 6.26-5.986 10.262-7.744l1.845 2.972c-5.691 2.758-9.945 6.497-10.548 12.767 2.568 0 4.698-.093 6.596.586 2.16.773 3.473 2.207 4.011 3.85.855 2.575.44 5.153-1.761 7.2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="div-block-27-copy">
                <blockquote className="c-block-quote-s">
                  &quot;Chance combines a deep technical understanding of the
                  game with an incredible ability to read his opponents both
                  based on their tendencies and body language. I enjoy having
                  him at my table for the banter, but he is tough to play
                  against.&quot;
                </blockquote>
                <div className="text-block-2">DANIEL NEGREANU</div>
                <div className="dk">#1 All-Time Live Poker Earnings</div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-section wf-section">
          <div className="b-container is--centered">
            <div className="b-header c-centered">
              <div className="b-meta">
                <div>TOP POKER PLAYER AND INVESTOR</div>
              </div>
              <h3 className="h3">
                Why CLAI is the single most effective tool for improving in
                tournament poker
              </h3>
              <p className="dk">
                When creating CL AI we saw a major problem with the average
                tournament player and built CL AI to solve 5 key issues with
                players.
              </p>
            </div>
            <div className="w-layout-grid l-grid-3f u-marg-t-lr">
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="40"
                      fill="none"
                      viewBox="0 0 32 40"
                    >
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 16.667v6.666h6.667"
                      />
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 38.333c8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15zM11 1.667h10M16 1.667v1.666"
                      />
                    </svg>
                  </div>
                  <h6 className="h5">
                    The average player doesn’t work on their game enough.
                  </h6>
                  <p className="dk is-small">
                    Players aren’t consistent with their study. They buy books,
                    courses, programs and don’t even use them. CL AI solves this
                    by breaking down your study into daily assignments and
                    adding a powerful layer of gamification. You will find
                    yourself wanting to work on your game and experiencing all
                    the rewards that come with it.
                  </p>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="40"
                      fill="none"
                      viewBox="0 0 32 40"
                    >
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 16.667v6.666h6.667"
                      />
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 38.333c8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15zM11 1.667h10M16 1.667v1.666"
                      />
                    </svg>
                  </div>
                  <h6 className="h5">
                    The average player doesn’t know what world className players
                    are doing differently.
                  </h6>
                  <p className="dk is-small">
                    Cl AI allows you to see word for word exactly how some of
                    the best tournament players are thinking about spots. This
                    enables you to see the gaps in your own process in addition
                    to learning from the best in the game. It will also make you
                    a tougher opponent as you will start to understand exactly
                    how world-className players are thinking about poker.
                  </p>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="40"
                      fill="none"
                      viewBox="0 0 32 40"
                    >
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 16.667v6.666h6.667"
                      />
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 38.333c8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15zM11 1.667h10M16 1.667v1.666"
                      />
                    </svg>
                  </div>
                  <h6 className="h5">
                    The average player doesn’t know what they need to work on.
                  </h6>
                  <p className="dk is-small">
                    Most players are lost when it comes to their poker
                    education. They don’t know what to study and why. CL AI
                    functions as a powerful assessment tool. The AI algorithm is
                    constantly learning where your game has leaks and sets you
                    on a course to fix them.
                  </p>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="40"
                      fill="none"
                      viewBox="0 0 32 40"
                    >
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 16.667v6.666h6.667"
                      />
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 38.333c8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15zM11 1.667h10M16 1.667v1.666"
                      />
                    </svg>
                  </div>
                  <h6 className="h5">
                    The average player doesn’t have enough experience
                  </h6>
                  <p className="dk is-small">
                    Most tournament players get themselves into a spot and it
                    may be the first time they are faced with it. CL AI
                    simulates on table play by putting you in thousands of real
                    spots. The next time you are at the table you will know the
                    right decision because you have previously been in it.
                  </p>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="40"
                      fill="none"
                      viewBox="0 0 32 40"
                    >
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 16.667v6.666h6.667"
                      />
                      <path
                        stroke="#E8BA73"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M16 38.333c8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15zM11 1.667h10M16 1.667v1.666"
                      />
                    </svg>
                  </div>
                  <h5 className="h5">
                    The average player doesn’t have enough confidence.
                  </h5>
                  <p className="dk is-small">
                    Ever been in a spot where you think you know the right
                    decision but just can’t pull the trigger? This is because
                    most players lack confidence. The CL AI platform completely
                    changes this by giving you real time feedback on your
                    answers. When you start going through thousands of spots and
                    realize you are getting them correct you will start to build
                    the confidence that you can make the right decision when it
                    matters.
                  </p>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-section cc-60-0 wf-section">
          <div className="b-container is--small is--centered">
            <div className="w-layout-grid div-block-25">
              <div
                id="w-node-_02f9cdb0-e9b2-3fb6-2f32-505ace059bed-7de95240"
                className="div-block-29"
              >
                <img
                  src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6070b94f703f6d3b5cad3e77_avatar-4.png"
                  loading="lazy"
                  alt=""
                />
                <div className="golden-blur"></div>
                <div className="div-block-30">
                  <div className="w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="30"
                      fill="none"
                      viewBox="0 0 38 30"
                    >
                      <path
                        fill="#E8BA73"
                        d="M14.939 27.674c-3.482 3.238-9.412 2.382-12.188-1.046C-.535 22.58-1.191 14.907 4.533 8.043c2.84-3.405 6.262-5.986 10.263-7.744l1.845 2.972C10.95 6.029 6.695 9.768 6.093 16.038c2.568 0 4.698-.093 6.596.586 2.16.773 3.473 2.207 4.011 3.85.855 2.575.44 5.153-1.761 7.2zm20.636 0c-3.482 3.238-9.412 2.382-12.188-1.046-3.286-4.048-3.942-11.721 1.783-18.585 2.839-3.405 6.26-5.986 10.262-7.744l1.845 2.972c-5.691 2.758-9.945 6.497-10.548 12.767 2.568 0 4.698-.093 6.596.586 2.16.773 3.473 2.207 4.011 3.85.855 2.575.44 5.153-1.761 7.2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="div-block-27-copy">
                <blockquote className="c-block-quote-s">
                  “Chance is the one guy who thinks of more creative spots than
                  I do, and one of the few guys I try to consistently talk
                  strategy with. To my students, I always recommend they hire
                  Chance for his expertise in live NL MTT’s.”
                </blockquote>
                <div className="text-block-2">SHAUN DEEB</div>
                <div className="dk">Two-Time WSOP Bracelet Winner</div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-section wf-section">
          <div className="b-container">
            <div className="w-layout-grid l-grid-1f">
              <div className="w-layout-grid featured-article-grid">
                <div className="text-wrapper">
                  <div className="b-meta">
                    <div>CHIPLEADER AI FEATURES</div>
                  </div>
                  <h2 className="h2">
                    The Most Extensive Set of Tools Ever Created for Tournament
                    Poker
                  </h2>
                  <p className="dk">
                    CL AI isn’t just another app. It’s game changing AI applied
                    to poker, surrounded by a rich level of content and a
                    powerful community. Below are a list of some of the key
                    features.
                  </p>
                </div>
                <div className="video-wrapper">
                  <div className="video">
                    <div className="w-embed w-iframe w-script">
                      <iframe
                        src="//fast.wistia.net/embed/iframe/1t6j327wvg?videoFoam=true"
                        allowtransparency="true"
                        frameborder="0"
                        scrolling="no"
                        className="wistia_embed"
                        name="wistia_embed"
                        allowfullscreen
                        mozallowfullscreen
                        webkitallowfullscreen
                        oallowfullscreen
                        msallowfullscreen
                        width="100%"
                        height="100%"
                      ></iframe>
                      <script src="//fast.wistia.net/assets/external/iframe-api-v1.js"></script>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-layout-grid featured-article-grid">
                <div className="img-wrapper">
                  <img
                    src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6083f56eae1ca42d5f53d2c1_topic-card%3Astatic.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div
                  id="w-node-a6197477-fa93-59e4-961d-895d6bdd3e73-7de95240"
                  className="text-wrapper is--centered"
                >
                  <div className="div-block-32">
                    <h4 className="h4">AI Driven Paths of Poker Development</h4>
                    <p className="dk is-small">
                      Strong in ICM spots but weak at Big Blind defense? No
                      problem. With a wide range of custom built tracks you can
                      work on the specific areas of your game that matter most.
                    </p>
                  </div>
                  <div className="golden-blur-copy"></div>
                </div>
              </div>
              <div className="w-layout-grid featured-article-grid">
                <div
                  id="w-node-_874adf59-dce4-817f-9a48-4f7aa0342c2d-7de95240"
                  className="text-wrapper is--centered"
                >
                  <div className="div-block-32">
                    <h4 className="h4">
                      The Deepest Game Assessment Ever Created in Poker
                    </h4>
                    <p className="dk is-small">
                      CL AI was built on a non-stop engine allowing us to assess
                      the big and small leaks in your game. Through consistent
                      use of the platform we are able to provide real time
                      insights into exactly where you need to improve and how.
                    </p>
                  </div>
                  <div className="golden-blur-copy"></div>
                </div>
                <div className="img-wrapper">
                  <img
                    src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6083f6f17650bc052e0489db_clai-7.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 94vw, (max-width: 674px) 95vw, 641px"
                    srcSet="
                  https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6083f6f17650bc052e0489db_clai-7-p-500.png 500w,
                  https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6083f6f17650bc052e0489db_clai-7.png       641w
                "
                    alt=""
                  />
                </div>
              </div>
              <div className="w-layout-grid featured-article-grid">
                <div className="img-wrapper">
                  <img
                    src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/6083f6f12f8b8e802b03f4b4_clai-8.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div
                  id="w-node-_9926f145-8e0d-18c2-325e-392b9b71d76f-7de95240"
                  className="text-wrapper is--centered"
                >
                  <div className="div-block-32">
                    <h4 className="h4">3,000+ Real Spots in Chance/Alex</h4>
                    <p className="dk is-small">
                      Most training programs are built on generated spots. CL AI
                      was built on an archive of real spots in a wide range of
                      tournaments including both online and live.
                    </p>
                  </div>
                  <div className="golden-blur-copy"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="testimonials" className="b-section wf-section">
          <div className="b-container is--small is--vertical">
            <div className="b-header c-centered">
              <div className="b-meta">
                <div>TESTIMONIALS</div>
              </div>
              <h2 className="h2">
                Don’t take our word for it. Here is what some of our members
                have to say about chip leader AI
              </h2>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="w-dyn-items">
                <div role="listitem" className="w-dyn-item">
                  <div className="w-layout-grid div-block-25 u-marg-t-lr">
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb66fe-7de95240"
                      className="div-block-29"
                    >
                      <img
                        src="https://assets.website-files.com/5f5df70df3638c5881ea827b/5f6b9870df94781d8f2923c1_Daniel-Negreanu.png"
                        loading="lazy"
                        alt=""
                      />
                      <div className="golden-blur"></div>
                    </div>
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb6701-7de95240"
                      className="div-block-27-copy"
                    >
                      <blockquote className="c-block-quote-s">
                        “Chance combines a deep technical understanding of the
                        game with an incredible ability to read his opponents
                        both based on their tendencies and body language. I
                        enjoy having him at my table for the banter, but he is
                        tough to play against.”
                      </blockquote>
                      <div className="b-meta">
                        <div>Daniel Negreanu</div>
                      </div>
                      <div className="dk">#1 All-Time Live Poker Earnings</div>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <div className="w-layout-grid div-block-25 u-marg-t-lr">
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb66fe-7de95240"
                      className="div-block-29"
                    >
                      <img
                        src="https://assets.website-files.com/5f5df70df3638c5881ea827b/5f6b99651f353bbbc54aae47_Anthony-Zinno.png"
                        loading="lazy"
                        alt=""
                      />
                      <div className="golden-blur"></div>
                    </div>
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb6701-7de95240"
                      className="div-block-27-copy"
                    >
                      <blockquote className="c-block-quote-s">
                        “I’ve played 100’s of hours in high-stakes tourneys with
                        Chance. His ability to see subtle details in a hand is
                        what separates him from other players. Each time we
                        discuss hands together I’m able to come away with a new
                        breakthrough for approaching tough spots.”
                      </blockquote>
                      <div className="b-meta">
                        <div>Anthony Zinno</div>
                      </div>
                      <div className="dk">
                        WSOP Bracelet Winner and Three-Time WPT Champion
                      </div>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <div className="w-layout-grid div-block-25 u-marg-t-lr">
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb66fe-7de95240"
                      className="div-block-29"
                    >
                      <img
                        src="https://assets.website-files.com/5f5df70df3638c5881ea827b/5f6b9944de24725a0ebcadf3_Jesse-Sylvia.png"
                        loading="lazy"
                        alt=""
                      />
                      <div className="golden-blur"></div>
                    </div>
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb6701-7de95240"
                      className="div-block-27-copy"
                    >
                      <blockquote className="c-block-quote-s">
                        “I have been lucky enough to have had many poker
                        conversations with Chance, and I am continuously
                        impressed by the fact that I never leave one without
                        learning something. It is a testament to his insane work
                        ethic: Chance is constantly thinking about spots,
                        analyzing them, coming up with unique lines, and, most
                        importantly by far, trying them in real settings at the
                        highest stakes.
                      </blockquote>
                      <div className="b-meta">
                        <div>Jesse Sylvia</div>
                      </div>
                      <div className="dk">
                        WSOP Main Event Runner-Up, WPT Borgata Champion
                      </div>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <div className="w-layout-grid div-block-25 u-marg-t-lr">
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb66fe-7de95240"
                      className="div-block-29"
                    >
                      <img
                        src="https://assets.website-files.com/5f5df70df3638c5881ea827b/5f6b991c36302428a539415b_Pratyush-Buddiga.png"
                        loading="lazy"
                        alt=""
                      />
                      <div className="golden-blur"></div>
                    </div>
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb6701-7de95240"
                      className="div-block-27-copy"
                    >
                      <blockquote className="c-block-quote-s">
                        “Chance is one of the toughest opponents I come across
                        on a regular basis. He is a smart, creative player who
                        applies constant pressure. I think basically anyone
                        who’s looking to improve at MTTs could learn a lot from
                        his unique approach to the game.”
                      </blockquote>
                      <div className="b-meta">
                        <div>Pratyush Buddiga</div>
                      </div>
                      <div className="dk">
                        EPT $25k Champion, Aria $25K Champion
                      </div>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="w-dyn-item">
                  <div className="w-layout-grid div-block-25 u-marg-t-lr">
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb66fe-7de95240"
                      className="div-block-29"
                    >
                      <img
                        src="https://assets.website-files.com/5f5df70df3638c5881ea827b/5f6b998da0e7894f34cf9ec5_Shaun-Deeb.png"
                        loading="lazy"
                        alt=""
                      />
                      <div className="golden-blur"></div>
                    </div>
                    <div
                      id="w-node-ff00fd16-971e-bd73-dc79-58004fdb6701-7de95240"
                      className="div-block-27-copy"
                    >
                      <blockquote className="c-block-quote-s">
                        “Chance is the one guy who thinks of more creative spots
                        than I do, and one of the few guys I try to consistently
                        talk strategy with. To my students, I always recommend
                        they hire Chance for his expertise in live NL MTT’s.”
                      </blockquote>
                      <div className="b-meta">
                        <div>Shaun Deeb</div>
                      </div>
                      <div className="dk">Two-Time WSOP Bracelet Winner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-section cc-60-0 wf-section">
          <div className="b-container is--centered">
            <div className="b-header c-centered">
              <div className="b-meta">
                <div>PRICING</div>
              </div>
              <h3 className="h3">
                The Most Extensive Program at an Affordable Rate
              </h3>
              <p className="dk">
                We have a wide range of pricing options. Cancel at any time. CL
                AI is only a month to month commitment.
              </p>
            </div>
            <div className="w-layout-grid l-grid-3f u-marg-t-lr">
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="div-block-28">
                    <div className="b-meta">
                      <div>Basic</div>
                    </div>
                    <div>$29</div>
                  </div>
                  <div className="c-card-hide">
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Full Access to Chip Leader AI Platform
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Tournament Assessment Learning Engine
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Weekly Hand Breakdown</div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Monthly Live Workshop</div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        CLC Coaching Video Archive
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        The Chip Leader 24/7 Community
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Ability to Submit a Hand for Review
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                  </div>
                  <a
                    href="#"
                    className="b-nav__link-copy secondary w-inline-block"
                  >
                    <div>Start Now</div>
                  </a>
                </div>
                <div className="c-card-wrapper op30">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="div-block-28">
                    <div className="b-meta">
                      <div>CL AI</div>
                    </div>
                    <div>$59</div>
                  </div>
                  <div className="c-card-hide">
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Weekly Hand Breakdown</div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Monthly Live Workshop</div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        CLC Coaching Video Archive
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        The Chip Leader 24/7 Community
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                    <div className="c-col-inner op10">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Ability to Submit a Hand for Review
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                  </div>
                  <a
                    href="#"
                    className="b-nav__link-copy secondary w-inline-block"
                  >
                    <div>Start Now</div>
                  </a>
                </div>
                <div className="c-card-wrapper">
                  <div className="c-card-bg"></div>
                </div>
              </div>
              <div className="c-card">
                <div className="c-card-inner">
                  <div className="div-block-28">
                    <div className="b-meta">
                      <div>CL AI +</div>
                    </div>
                    <div>$129</div>
                  </div>
                  <div className="c-card-hide">
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Access to 3,000+ and Growing Questions
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Weekly Hand Breakdown</div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">Monthly Live Workshop</div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        CLC Coaching Video Archive
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        The Chip Leader 24/7 Community
                      </div>
                    </div>
                    <div className="c-seperator"></div>
                    <div className="c-col-inner">
                      <div className="c-circle__green">
                        <div className="w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="11"
                            fill="none"
                            viewBox="0 0 14 11"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              d="M2 6.053L4.963 9 12 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block-3">
                        Ability to Submit a Hand for Review
                      </div>
                    </div>
                    <div className="c-seperator op10"></div>
                  </div>
                  <a
                    href="#"
                    className="b-nav__link-copy secondary w-inline-block"
                  >
                    <div>Start Now</div>
                  </a>
                </div>
                <div className="c-card-wrapper op30">
                  <div className="c-card-bg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-section wf-section">
          <div className="b-container is--small is--centered">
            <div className="b-header c-centered">
              <div className="b-meta">
                <div>FAQ</div>
              </div>
              <h2 className="h2">Frequently Asked Questions</h2>
            </div>
            <ul role="list" className="l-list-1f u-marg-t-lr">
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
              <li className="l-list-item">
                <div className="c-card is--accordion">
                  <div className="c-card-inner">
                    <div className="div-block-31">
                      <h6 className="h5">How does Chip Leader AI Work?</h6>
                      <div className="circle-yellow is--smaller">
                        <div className="c-arrow-up w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="9"
                            fill="none"
                            viewBox="0 0 14 9"
                          >
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.6 1.9L7 7.5 1.4 1.9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="c-card-hide u-marg-t-lr">
                      <p className="dk is-small">
                        Mauris varius felis at commodo imperdiet. Cras faucibus
                        egestas urna, sed cursus massa cursus in.apien interdum
                        quis. Fusce id arcu eget nisl porta blandit. Etiam
                        mollis massa et ipsum tincidunt, at luctus velit
                        ultrices. Aliquam posuere mi ac risus scelerisque, in
                        aliquam nunc molestie.
                      </p>
                    </div>
                  </div>
                  <div className="c-card-wrapper">
                    <div className="c-card-bg"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer wf-section">
        <div className="footer__start">
          <div className="footer__nav">
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d484-7de95240"
              className="footer__nav-col"
            >
              <a href="/" className="b-brand-footer w-inline-block">
                <img
                  src="https://assets.website-files.com/5f57d25e2a09e77e0cd3d7dc/5f651cbc54d254a8f6744908_AI-img-21.png"
                  loading="lazy"
                  alt=""
                  className="b-nav-clc-logo"
                />
                <div className="div-block-14"></div>
              </a>
              <div className="text-block">CHIP LEADER AI</div>
            </div>
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d48a-7de95240"
              className="footer__nav-col"
            >
              <div className="b-footer__links">
                <a href="/" className="b-nav__link w-inline-block">
                  <div>Home</div>
                </a>
                <a href="/about" className="b-nav__link w-inline-block">
                  <div>about</div>
                </a>
                <a
                  href="/galfond-challenge"
                  className="b-nav__link w-inline-block"
                >
                  <div>galfond challenge</div>
                </a>
              </div>
            </div>
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d495-7de95240"
              className="footer__nav-col"
            >
              <ul role="list" className="footer__nav-list w-list-unstyled">
                <li className="footer__nav-li left">
                  <a
                    href="https://www.facebook.com/chipleadercoaching"
                    target="_blank"
                    className="footer__nav-social-item facebook"
                  ></a>
                </li>
                <li className="footer__nav-li">
                  <a
                    href="https://www.instagram.com/chipleadercoaching/"
                    target="_blank"
                    className="footer__nav-social-item instagram"
                  ></a>
                </li>
                <li className="footer__nav-li right">
                  <a
                    href="https://twitter.com/ChipLDR"
                    target="_blank"
                    className="footer__nav-social-item twitter"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="c-seperator"></div>
        <div className="footer__end">
          <div className="footer__nav">
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d4a0-7de95240"
              className="footer__nav-col"
            >
              <div className="b-footer__link">
                Copyright Chip Leader AI Inc. 2021
              </div>
            </div>
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d4a3-7de95240"
              className="footer__nav-col"
            >
              <div className="b-footer__link">
                Terms &amp; Conditions  |  Privacy Policy  | User Agreement
              </div>
            </div>
            <div
              id="w-node-_7822025e-12f9-d269-b40f-d9a66cd3d4a6-7de95240"
              className="footer__nav-col"
            >
              <div className="b-footer__link">
                Designed by Blake &amp; Barry
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="popup">
        <div className="w-embed w-iframe w-script">
          <html>
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
              <title>CLC Tournament Assessment</title>
              <Style>{`
          html {
            margin: 0;
            height: 100%;
          }
          iframe {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            border: 0;
          }
        `}</Style>
            </head>
            <body>
              <iframe
                id="typeform-full"
                width="100%"
                height="100%"
                frameborder="0"
                allow="camera; microphone; autoplay; encrypted-media;"
                src="https://form.typeform.com/to/YSXZUxBx"
              ></iframe>
              <script
                type="text/javascript"
                src="https://embed.typeform.com/embed.js"
              ></script>
            </body>
          </html>
        </div>
        <div scroll="enable" className="u-btn-close">
          <div>Close</div>
        </div>
      </div>
    </body>
  );
};
