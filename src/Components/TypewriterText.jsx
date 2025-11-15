import Typewriter from 'typewriter-effect';

const TypewriterText = ({ text, speed, onComplete, ticking, ...props }) => {
  return (
    <div {...props}>
      <Typewriter
        options={{
          delay: speed ? speed : 50,
          cursor: ticking ? ' |':' ',
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .callFunction(() => {
              if (onComplete) {
                onComplete();
              }
            })
            .start();
        }}
      />
    </div>
  );
};

export default TypewriterText;
