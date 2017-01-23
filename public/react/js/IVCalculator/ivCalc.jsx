export class IVCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPokemon: '1'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({selectedPokemon: event.target.value});
    }
    handleSubmit(event) {
        alert('Your Selected Pokemon is: ' + this.state.selectedPokemon);
        event.preventDefault();
    }

    render() {
        var allOptions = [];

        if (this.props.all.pokemon !== undefined){
            this.props.all.pokemon.forEach(function(pokemon) {
                allOptions.push(<option key={pokemon.Id} value={pokemon.Id}>{pokemon.Name}</option>);
            });
        }
        return (
        <form onSubmit={this.handleSubmit} className="main calculate" autoComplete="off">
			<article className="primary">
				<label>
					Choose your Pokémon<br />
                </label>
                <select value={this.state.selectedPokemon} onChange={this.handleChange} name="pokemon" tabIndex="-1" className="select2-hidden-accessible" aria-hidden="true">
                    <option></option>
                    {allOptions}
                </select>
				<div className="preview"><img src="/images/pokemon/1.png" /></div>
			</article>

			<article className="secondary">
				<div className="data-grid header">
					<div>CP</div>
					<div>HP</div>
					<div>Dust</div>
				</div>

				<div className="data-values">
					<div className="data-grid">
						<label>
							<input type="number" lang="nb" name="cp" placeholder="CP" />
						</label>

						<label>
							<input type="number" name="hp" placeholder="HP" />
						</label>

						<label>
							<input type="number" name="dust" placeholder="Dust" />
						</label>
					</div>
				</div>

				<label className="checkbox">
					<div className="check">
						<input type="checkbox" name="ct" />
					</div>
					<p>You have just caught this Pokémon and not powered it up.</p>
				</label>
			</article>

			<article className="secondary toggleable">
				<h2 className="toggle appraisal-toggle">
					<div className="title">
						<i className="fa fa-angle-right"></i>
						<i className="fa fa-angle-down"></i>
						Appraisal
                    </div>
					<div className="teams">
						<img src="/images/tools/team-mystic-vector.svg" data-team="mystic" />
						<img src="/images/tools/team-valor-vector.svg" data-team="valor" />
						<img src="/images/tools/team-instinct-vector.svg" data-team="instinct" className="instinct" />
					</div>
					<div className="reset">
						<i className="fa fa-undo"></i>
					</div>
				</h2>

				<div className="advanced">
					<div className="teams">
						<p>Choose your team:</p>
						<div className="images">
							<img src="/images/tools/team-mystic-vector.svg" data-team="mystic" />
							<img src="/images/tools/team-valor-vector.svg" data-team="valor" />
							<img src="/images/tools/team-instinct-vector.svg" data-team="instinct" className="instinct" />
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

			<article className="secondary toggleable">
				<h2 className="toggle advanced-toggle">
					<div className="title">
						<i className="fa fa-angle-right"></i>
						<i className="fa fa-angle-down"></i>
						Advanced options
                    </div>
					<div className="reset">
						<i className="fa fa-undo"></i>
					</div>
				</h2>
				<div className="advanced">
					<label className="multi double">
						<div className="check">
							<input type="checkbox" name="ev" />
						</div>
						<p>You have powered up the Pokémon and the next power-up requires a higher amount of stardust. **</p>
					</label>

					<hr />

					<p className="add-levels">
						Enter the Pokémon's new stats after powering up to narrow down the results:					</p>

					<div className="data-values new">
						<div className="data-grid">
							<label>
								<input type="number" lang="nb" name="cp" placeholder="CP" />
							</label>

							<label>
								<input type="number" name="hp" placeholder="HP" />
							</label>

							<label>
								<input type="number" name="dust" placeholder="Dust" />
							</label>
						</div>
					</div>
				</div>
			</article>

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