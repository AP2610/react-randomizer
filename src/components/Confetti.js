import { useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

// Blasts some confetti onto the screen.
const ConfettiComponent = (props) => {
	const { width, height } = useWindowSize();
    const { show, setConfetti } = props;

    // Stop the confetti after a certain amount of time.
	useEffect(() => {
		if (show) {
			const timerID = setTimeout(() => setConfetti(false), 1000 * 10);
			return () => clearTimeout(timerID);
		}
	}, [show]); // eslint-disable-line react-hooks/exhaustive-deps

	return <Confetti width={width} height={height} />;
};

export default ConfettiComponent;