import clsx from "clsx";

const TeamList = (props) => {
    const { teamMemberElements, isRandomizerActive, onRandomizeStartClick } = props;
	const classes = clsx('randomize-button', {
		'randomizing': isRandomizerActive,
		'start' : !isRandomizerActive,
	})

	return (
		<ul className="circle-container">
			{teamMemberElements}
			<button
				disabled={isRandomizerActive}
				className={classes}
				onClick={onRandomizeStartClick}
			>
				{isRandomizerActive ? "Randomizing" : "Start"}
			</button>
		</ul>
	);
};

export default TeamList;
