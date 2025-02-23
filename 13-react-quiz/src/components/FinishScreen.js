function FinishScreen({points,totalPoints, highscore}) {
  const percentage = Math.ceil((points / totalPoints) * 100)
  let emoji;
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 85 && percentage < 100) emoji = '🥈'
  if (percentage >= 70 && percentage < 85) emoji = '🥉'
  if (percentage >= 50 && percentage < 70) emoji = '🙃'
  if (percentage >= 30 && percentage < 50) emoji = '🤨'
  if (percentage < 30) emoji = '🤦‍♂️'

  return (
    <>
    <p className="result">
      {emoji} You scored <strong>{points}</strong> out of {totalPoints} (
      {percentage}%)
    </p>
    <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  )
}

export default FinishScreen
