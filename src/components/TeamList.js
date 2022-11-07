const TeamList = (props) => {
    const { teamMemberElements, isRandomizerActive, onRandomizeStartClick } = props;

	return (
		<ul className="circle-container">
			{teamMemberElements}
			<button
				disabled={isRandomizerActive}
				className={`${
					isRandomizerActive ? "randomizing" : "start"
				} randomize-button`}
				onClick={onRandomizeStartClick}
			>
				{isRandomizerActive ? "Randomizing" : "Start"}
			</button>
		</ul>
	);
};

export default TeamList;
