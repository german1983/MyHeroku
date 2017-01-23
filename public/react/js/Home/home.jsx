class Pokemon extends React.Component {
    render() {
        return (
            <a href="/en/pokemon/1-bulbasaur" data-name="{this.props.pokemon.Name}">
				<div className="pokemon">
					<h2>{this.props.pokemon.Name}</h2>
					<img className="lazy" src={'https://pokemon.gameinfo.io/images/pokemon/' + this.props.pokemon.Id + '.png'} style={{display: 'inline'}} />
				</div>
			</a>
        )
    }
}

class PokemonList extends React.Component {
     render() {
       var allPokemons = [];
       
       if (this.props.all.pokemon !== undefined){
        this.props.all.pokemon.forEach(function(pokemon) {
            allPokemons.push(<Pokemon key={pokemon.Id} pokemon={pokemon} />);
        });
       }

       
        return (
            <div className="grid pokemon-list wrappable">
                {allPokemons}
            </div>
        );
    }
}
export class Home extends React.Component {
  constructor(){
      super();
      this.state = {
          pokemons: []
      };
  };

  componentDidMount() {
      var path = '../pokemon/assets/baseStats.json';

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
                <PokemonList all={this.state.pokemons} ></PokemonList>
            </div>
        );
    }
}
