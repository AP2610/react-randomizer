import { useState } from 'react';
import { TEAM } from "./data/teamDetails";
import { shuffle, randomNumberFromInterval, capitalizeString } from './utils/utils';
import TeamList from './components/TeamList';
import ConfettiComponent from './components/Confetti';
import './styles/App.scss';

const App = () => {
	const [hots, setHots] = useState('');
	const [team, setTeam] = useState(TEAM);
	const [stopTime, setStopTime] = useState(randomNumberFromInterval(15, 30));
	const [isRandomizerActive, setIsRandomizerActive] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

    // Creates a list element for each team member.
	const teamMemberElements = team.map((teamMember, index) => {
		const { name, avatar } = teamMember;
		return (
			<li className={`${teamMember?.isActive ? 'active' : ''} team-member`} key={index}>
				<img src={avatar} alt="" />
				<h4>{capitalizeString(name)}</h4>
			</li>
		);
	});

	// This function is called within a repeater function so it is executed X amount of times until the repeater is stopped.
	const setIsActiveOnTeamMembers = iteration => {
		const newTeam = shuffle(team).map((teamMember, index) => {
			if (index + 1 === iteration) {
				return { ...teamMember, isActive: true, isHots: true };
			}
			return { ...teamMember, isActive: false, isHots: false };
		});

		const newHots = newTeam.find((teamMember) => teamMember?.isHots);
		setHots(newHots);
		setTeam(newTeam);
	};

	// This function will run another function or action X amount of times until a criteria is met to stop the repeater.
	const repeat = (numberOfIterations) => {
		let iterationCounter = 1;
		let stopCounter = 0;

		const repeater = () => {
			const timeoutId = setTimeout(() => {
				setIsActiveOnTeamMembers(iterationCounter);
				iterationCounter++;
				stopCounter++;

				if (numberOfIterations === iterationCounter) iterationCounter = 1;

				repeater();
			}, 300);

			if (stopCounter === stopTime) {
				clearTimeout(timeoutId);
				setIsRandomizerActive(false); // Turn off the randomizer.
				setShowConfetti(true); // Indicate that it is over to show confetti.
			}
		};

		repeater();
	};

    // Start the randomizer and set when it should stop using a random number between 15 and 30.
	const handleRandomizeStartClick = () => {
		setStopTime(randomNumberFromInterval(15, 30));
		repeat(team.length + 1, setIsActiveOnTeamMembers);
		setIsRandomizerActive(true);
	};

	return (
        <section className="team-randomizer-app">
            <div className="h1-container app-heading">
                <h1>Randomizer</h1>
            </div>
            <main>
                <TeamList 
                    teamMemberElements={teamMemberElements} 
                    isRandomizerActive={isRandomizerActive} 
                    onRandomizeStartClick={handleRandomizeStartClick} 
                />

                {!isRandomizerActive && hots && (
                    <div className="h1-container">
                        <h1 className="is-hots">Congratulations {capitalizeString(hots?.name)}, you are the new HOTS!</h1>
                    </div>
                )}

                {showConfetti && hots && !isRandomizerActive && <ConfettiComponent show={showConfetti} setConfetti={setShowConfetti} />}
            </main>
        </section>
	);
};

export default App;
