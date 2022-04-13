import TypeIt from "typeit-react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
      <motion.div style={{ margin: "500px" }}></motion.div>
    </Wrapper>
  );
};
