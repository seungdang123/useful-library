import TypeIt from "typeit-react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled(motion.div)`
  display: flex;
  height: auto;
  background: #000;
  color: #fff;
  padding: 30px;
  text-align: center;
  flex-direction: column;
`;

const Footer = styled.div`
  margin-top: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ScrollDownBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ScrollDownAnimation = styled(motion.div)`
  margin-top: 350px;
  font-weight: 100;
  font-size: 12px;
  letter-spacing: 3px;
`;

const FadeIn = {
  start: {
    opacity: 0,
  },

  end: {
    opacity: 1,
  },
};

const Arrow = styled(motion.div)`
  margin-top: 30px;
  font-weight: 100;
`;

const scroll = {
  start: {
    y: 0,
  },

  end: {
    y: 15,
  },
};

const Main = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 300px;
  height: 600px;
  padding: 20px;
`;

export default () => {
  const { ref, inView } = useInView();
  const animation = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        x: "-300px",
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });

      animation2.start({
        x: "300px",
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });

      animation3.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        x: 0,
        opacity: 0,
      });

      animation2.start({
        x: 0,
        opacity: 0,
      });

      animation3.start({
        x: 0,
        opacity: 0,
      });
    }
  }, [inView]);

  const headerRef = useRef(null);
  const revealRefs = useRef([]);

  revealRefs.current = [];

  const [background, setBackground] = useState("#000");
  const sections = [
    {
      title: "Title1",
      subTitle: "Greensock",
    },
    {
      title: "Title2",
      subTitle: "Scroll Animation",
    },
    {
      title: "Title3",
      subTitle: "'^'",
    },
  ];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }

    console.log(revealRefs.current);
  };

  const toggleBackground = () => {
    const color = background !== "#000" ? "#000" : "#222";
    setBackground(color);
  };

  useEffect(() => {
    gsap.to(headerRef.current, {
      duration: 1,
      backgroundColor: background,
      ease: "none",
    });
  }, [background]);

  useEffect(() => {
    gsap.from(headerRef.current, {
      duration: 1,
      autoAlpha: 0,
      ease: "none",
      delay: 1,
    });

    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          x: 0,
          duration: 1,
          autoAlpha: 1,
          scale: 1.2,
          rotateZ: 3,
          ease: "none",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center += 100",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <Wrapper>
      <Footer className="Footer">
        <TypeIt
          style={{ color: "#CCCCC4", fontSize: "50px", fontWeight: "100" }}
          options={{ loop: true, speed: 100 }}
          getBeforeInit={(instance) => {
            instance
              .type("Type It")
              .pause(750)
              .delete(7)
              .pause(500)
              .type("It's awesome !")
              .pause(500);

            // Remember to return it!
            return instance;
          }}
        ></TypeIt>
      </Footer>
      <ScrollDownBox
        variants={FadeIn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <ScrollDownAnimation>Scroll</ScrollDownAnimation>
        <Arrow
          variants={scroll}
          initial={"start"}
          animate={"end"}
          transition={{
            duration: 1,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          ⌵
        </Arrow>
      </ScrollDownBox>
      <Main>
        <motion.div
          ref={ref}
          animate={animation}
          style={{
            x: 0,
            height: "100px",
            border: "1px solid black",
            margin: "15px",
            fontSize: "35px",
            fontWeight: "100",
            textAlign: "center",
            letterSpacing: 1.5,
          }}
        >
          Framer motion
        </motion.div>

        <motion.div
          ref={ref}
          animate={animation3}
          style={{
            x: 0,
            height: "100px",
            border: "1px solid black",
            margin: "15px",
            fontSize: "35px",
            fontWeight: "100",
            textAlign: "center",
            letterSpacing: 1.5,
          }}
        >
          &
        </motion.div>

        <motion.div
          ref={ref}
          animate={animation2}
          style={{
            x: 0,
            height: "100px",
            border: "1px solid black",
            margin: "15px",
            fontSize: "35px",
            fontWeight: "100",
            textAlign: "center",
            letterSpacing: 1.5,
          }}
        >
          Intersection Observe
        </motion.div>
      </Main>
      <motion.div
        ref={headerRef}
        style={{
          margin: "500px 0",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            margin: "30px 0",
            fontWeight: "100",
            letterSpacing: 3,
          }}
        >
          Greensock scroll trigger
        </p>
        <button
          onClick={() => toggleBackground()}
          style={{
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            textAlign: "center",
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Toggle
        </button>
        {sections.map(({ title, subTitle }) => {
          return (
            <motion.div
              key={title}
              ref={addToRefs}
              style={{
                x: "-50vw",
                height: "150px",
                width: "30%",
                margin: "100px 0",
                border: "1px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "100",
                letterSpacing: 1.5,
              }}
            >
              <h2>{subTitle}</h2>
            </motion.div>
          );
        })}
      </motion.div>
    </Wrapper>
  );
};
