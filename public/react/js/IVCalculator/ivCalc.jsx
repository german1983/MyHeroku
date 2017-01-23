class PokemonSelector extends React.Component {
     constructor(props) {
        super(props);
    }
  
    render(){
        return (
            <article className="primary">
                <label>
                    Choose your Pokémon<br />
                </label>
                <select value={this.props.selectedPokemon} onChange={this.props.handleChange} name="pokemon" tabIndex="-1" className="select-list" aria-hidden="true">
                    {this.props.allOptions}
                </select>
                <div className="preview"><img src={'https://pokemon.gameinfo.io/images/pokemon/' + this.props.selectedPokemon + '.png'}/></div>
            </article>
        )
    }

}

class PokemonAttributes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article className="secondary">
				<div className="data-grid header">
					<div>CP</div>
					<div>HP</div>
					<div>Dust</div>
				</div>

				<div className="data-values">
					<div className="data-grid">
						<label>
							<input type="number" placeholder="CP" value={this.props.attributes.cp} onChange={this.props.handleChangeCP}/>
						</label>

						<label>
							<input type="number" placeholder="HP"  value={this.props.attributes.hp} onChange={this.props.handleChangeHP}/>
						</label>

						<label>
							<input type="number" placeholder="Dust" value={this.props.attributes.dust} onChange={this.props.handleChangeDust}/>
						</label>
					</div>
				</div>

				<label className="checkbox">
					<div className="check">
						<input type="checkbox" value={this.props.attributes.ct} name="ct" onChange={this.props.handleChangeCT} />
					</div>
					<p>You have just caught this Pokémon and not powered it up.</p>
				</label>
			</article>
        )
    }
}

class PokemonTrainerInformation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
			<article className="secondary toggleable">
				<h2 className="toggle appraisal-toggle">
					<div className="title">
						<i className="fa fa-angle-right"></i>
						<i className="fa fa-angle-down"></i>
						Appraisal
                    </div>
					<div className="teams">
						<img src={'https://pokemon.gameinfo.io/images/tools/team-mystic-vector.svg'}  data-team="mystic" />
						<img src={'https://pokemon.gameinfo.io/images/tools/team-valor-vector.svg'} data-team="valor" />
						<img src={'https://pokemon.gameinfo.io/images/tools/team-instinct-vector.svg'} data-team="instinct" className="instinct" />
					</div>
					<div className="reset">
						<i className="fa fa-undo"></i>
					</div>
				</h2>

				<div className="advanced">
					<div className="teams">
						<p>Choose your team:</p>
						<div className="images">
							<img src={'https://pokemon.gameinfo.io/images/tools/team-mystic-vector.svg'} data-team="mystic" />
							<img src={'https://pokemon.gameinfo.io/images/tools/team-valor-vector.svg'} data-team="valor" />
							<img src={'https://pokemon.gameinfo.io/images/tools/team-instinct-vector.svg'} data-team="instinct" className="instinct" />
						</div>
						<hr />
					</div>

					<div className="team-content">
						<div className="check-grid">
							<label>
								<input type="checkbox" name="comment" value="1" />
								<p data-text="overall"></p>
							</label>
							<label>
								<input type="checkbox" name="comment" value="2" />
								<p data-text="overall"></p>
							</label>
							<label>
								<input type="checkbox" name="comment" value="3" />
								<p data-text="overall"></p>
							</label>
							<label>
								<input type="checkbox" name="comment" value="4" />
								<p data-text="overall"></p>
							</label>
						</div>

						<hr />

						<div className="attribute">
							<p>
								<span data-text-part="first"></span>
								<select name="best_attr" className="inline" size="4">
									<option value="">--</option>
									<option value="att">Attack</option>
									<option value="sta">HP</option>
									<option value="def">Defense</option>
								</select>
								<span data-text-part="last"></span>
							</p>

                            <div className="labels" style={{display: 'none'}}>
								<label className="fixed-center">
									<input type="checkbox" name="extra_attr" value="att" />
									<span data-text="attributes" data-replace="Attack"></span>
								</label>

								<label className="fixed-center">
									<input type="checkbox" name="extra_attr" value="sta" />
									<span data-text="attributes" data-replace="HP"></span>
								</label>

								<label className="fixed-center">
									<input type="checkbox" name="extra_attr" value="def" />
									<span data-text="attributes" data-replace="Defense"></span>
								</label>
							</div>
						</div>

						<hr />

						<div className="check-grid">
							<label>
								<input type="checkbox" name="stats" value="1" />
								<p data-text="stats"></p>
							</label>
							<label>
								<input type="checkbox" name="stats" value="2" />
								<p data-text="stats"></p>
							</label>
							<label>
								<input type="checkbox" name="stats" value="3" />
								<p data-text="stats"></p>
							</label>
							<label>
								<input type="checkbox" name="stats" value="4" />
								<p data-text="stats"></p>
							</label>
						</div>
					</div>
				</div>
			</article>
        )
    }
}

export class IVCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPokemonId: '1',
            selectedPokemon: {},
            pokemonProperties:{
                CP: 0,
                HP: 0,
                Dust: 0,
                ct: false
            },
            trainerInfo: {
                answer1: 0,
                answer2: 0,
                isAtt: false,
                isDef: false,
                isSta: false,

            }
        };

        this.handleChangeSelectedPokemon = this.handleChangeSelectedPokemon.bind(this);
        this.handlePropChangeCP = this.handlePropChangeCP.bind(this);
        this.handlePropChangeHP = this.handlePropChangeHP.bind(this);
        this.handlePropChangeDust = this.handlePropChangeDust.bind(this);
        this.handlePropChangeCT = this.handlePropChangeCT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeSelectedPokemon(event) {
        this.setState ({
            selectedPokemonId : event.target.value,
            selectedPokemon   : this.getPokemonDetailsById(event.target.value)
        });
    }

    handlePropChangeCP(event) {
        this.setState ({
            pokemonProperties: {
                CP: event.target.value,
                HP: this.state.pokemonProperties.HP,
                Dust: this.state.pokemonProperties.Dust,
                ct: this.state.pokemonProperties.ct
            }
        });
    }

    handlePropChangeHP(event) {
        this.setState ({
            pokemonProperties: {
                CP: this.state.pokemonProperties.CP,
                HP: event.target.value,
                Dust: this.state.pokemonProperties.Dust,
                ct: this.state.pokemonProperties.ct
            }
        });
    }
    
    handlePropChangeDust(event) {
        this.setState ({
            pokemonProperties: {
                CP: this.state.pokemonProperties.CP,
                HP: this.state.pokemonProperties.HP,
                Dust: event.target.value,
                ct: this.state.pokemonProperties.ct
            }
        });
    }

    handlePropChangeCT(event) {
        this.setState ({
            pokemonProperties: {
                CP: this.state.pokemonProperties.CP,
                HP: this.state.pokemonProperties.HP,
                Dust: this.state.pokemonProperties.Dust,
                ct: event.target.checked
            }
        });
    }

    handleChangeAnswer1(event) {
        this.setState ({
            trainerInfo: {
                answer1: event.target.value,
                answer2: this.state.trainerInfo.answer2,
                isAtt: this.state.trainerInfo.isAtt,
                isDef: this.state.trainerInfo.isDef,
                isSta: this.state.trainerInfo.isSta
            }
        });
    }

    handleChangeAnswer2(event) {
        this.setState ({
            trainerInfo: {
                answer1: this.state.trainerInfo.answer1,
                answer2: event.target.value,
                isAtt: this.state.trainerInfo.isAtt,
                isDef: this.state.trainerInfo.isDef,
                isSta: this.state.trainerInfo.isSta
            }
        });
    }

    handleChangeIsAtt(event) {
        this.setState ({
            trainerInfo: {
                answer1: this.state.trainerInfo.answer1,
                answer2: this.state.trainerInfo.answer2,
                isAtt: event.target.checked,
                isDef: this.state.trainerInfo.isDef,
                isSta: this.state.trainerInfo.isSta
            }
        });
    }

    handleChangeIsDef(event) {
        this.setState ({
            trainerInfo: {
                answer1: this.state.trainerInfo.answer1,
                answer2: this.state.trainerInfo.answer2,
                isAtt: this.state.trainerInfo.isAtt,
                isDef: event.target.checked,
                isSta: this.state.trainerInfo.isSta
            }
        });
    }

    handleChangeIsSta(event) {
        this.setState ({
            trainerInfo: {
                answer1: this.state.trainerInfo.answer1,
                answer2: this.state.trainerInfo.answer2,
                isAtt: this.state.trainerInfo.isAtt,
                isDef: this.state.trainerInfo.isDef,
                isSta: event.target.checked
            }
        });
    }

    handleSubmit(event) {
        alert('Your Selected Pokemon is: ' + JSON.stringify(this.state.selectedPokemon));
        alert('Your Pokemon Properties are: ' + JSON.stringify(this.state.pokemonProperties));
        alert('Your Trainer Info is: ' + JSON.stringify(this.state.trainerInfo));
        event.preventDefault();
    }

    getPokemonDetailsById(pokemonId){
        if (this.props.all.pokemon !== undefined){
            let i = 0;
            for (; i < this.props.all.pokemon.length; i++){
                if (this.props.all.pokemon[i].Id == pokemonId){
                    return this.props.all.pokemon[i];
                }
            }
        } else {
            return undefined;
        }
    }

    render() {
        var allOptions = [<option key={0}>---</option>];

        if (this.props.all.pokemon !== undefined){
            this.props.all.pokemon.forEach(function(pokemon) {
                allOptions.push(<option key={pokemon.Id} value={pokemon.Id}>{pokemon.Name}</option>);
            });
        }
        return (
        <form onSubmit={this.handleSubmit} className="main calculate" autoComplete="off">
			
            <PokemonSelector selectedPokemon={this.state.selectedPokemonId} allOptions={allOptions} handleChange={this.handleChangeSelectedPokemon}/>

            <PokemonAttributes attributes={this.state.pokemonProperties}
                               handleChangeCP={this.handlePropChangeCP}
                               handleChangeHP={this.handlePropChangeHP}
                               handleChangeDust={this.handlePropChangeDust}
                               handleChangeCT={this.handlePropChangeCT}
            />
            <PokemonTrainerInformation result={this.state.trainerInfo}
                               handleAnswer1={this.handleChangeAnswer1}
                               handleAnswer2={this.handleChangeAnswer2}
                               handleIsAtt={this.handleChangeIsAtt}
                               handleIsDef={this.handleChangeIsDef}
                               handleIsSta={this.handleChangeIsSta}
            
            />

			<article className="secondary">
				<div className="message alert"></div>

				<div className="submit">
					<button type="reset" className="reset">Reset</button>
                    <input type="submit" value="Calculate »" />
					// <button type="submit" className="calculate"></button>
				</div>
			</article>
		</form>
        );
    }
}