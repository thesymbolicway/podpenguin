
const MeteorShower = () => {
    const meteorNumber = 25;
    const meteors = [];
    for (let i = 0; i < meteorNumber; i++) {
      meteors.push(<div key={i} className={`meteor-${i + 1}`}></div>);
    }
    return meteors;
  }
  

  
  export default MeteorShower