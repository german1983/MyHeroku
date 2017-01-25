import {IVCalculator} from "./ivCalc.jsx"

export class IVCalculatorHome extends React.Component {
     constructor(){
      super();
      this.state = {
          pokemons: []
      };
  };

  componentDidMount() {
      var path = '/api/pokemon/baseStats';

      fetch(path)
          .then( (response) => {
              return response.json() })   
                  .then( (json) => {
                      this.setState({pokemons: json});
                  });
  };

    render() {
        return (
            <div>
              <IVCalculator all={this.state.pokemons}/>
            </div>
        );
    }
}
