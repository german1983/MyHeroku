angular.module('pokemon.pokemons.service', [

]).service('$evaluatePokemon', function(cpMultiplier, utils){
       this.p = {};
       this.cpMultipliers =  cpMultiplier.pokemonCpMultipliers;
        this.eval = function(pokemon){
              var trainerLevel = 25 // This needs to be obtained from the UI
              console.log("From Service: " + JSON.stringify(pokemon));
    
              this.p = this.getPokemon(pokemon); // sets levelMin and levelMax

              this.p.valids = [];
              var all = [];
                
              var limit = this.p.levelMax;
              if ( ! this.p.isPowered ) {
                limit = Math.min( limit, trainerLevel ); 
              }
              
              for ( var l = this.p.levelMin; l <= limit; l += this.p.isPowered ? 0.5 : 1 ) {
                    var combos = this.setLevel( l );

                    for ( var i = 0; i < combos.length; i++ ) {
                       this.p.valids.push( [ l, combos[i][0], combos[i][1], combos[i][2] ] ); 
                    }                
              }

        },
        this.getPokemon = function (pokemon){
            let p = pokemon;
            p.dustObj = JSON.parse(p.dust);

            if ( p.level ) {
              this.setLevel( p.level );
            } else {
               p.levelMin = p.dustObj.Level;
               p.levelMax = p.dustObj.Level + 1.5;
            }


            return p;
        }


        this.setLevel = function( lvl ) {
            this.p.level = lvl;

          var minHP = this.getHp( 0 );
          var maxHP = this.getHp( 15 );

          if ( this.p.hp < minHP || this.p.hp > maxHP ) {
            return false; 
          }

          var pSta = [];
          for ( var i = 0; i < 16; i++ ) {
            hpLevel = this.getHp( i );
            if ( hpLevel == this.p.hp ) {
              pSta.push( i ); 
            }
          }

          if ( pSta.length == 0 ) {
            return []; 
          }

          var poss = [];

          for ( var sta = 0; sta < pSta.length; sta++ ) {
            for ( var def = 0; def < 16; def++ ) {
              for ( var att = 0; att < 16; att++ ) {

                var cp = this.getCp( pSta[sta], att, def );
                if ( cp == this.p.cp && this.checkPrevData( att, def, pSta[sta]) && this.checkTrainerInfo(att, def, pSta[sta], this.p.selectedMessage1Object.Level, this.p.selectedMessage2Object.Level)){
                  poss.push( [ att, def, pSta[sta] ] );
                }
              }
            }
          }

          return poss;
        }


        this.compositeSTA = function( iv ) {
           // iv = iv || this.IVs.STA;
           return ( this.p.Stamina + iv ) * this.getCpMultiplier();
        }

        this.compositeATT = function( iv ) {
           // iv = iv || this.IVs.ATT;
           return ( this.p.Attack + iv ) * this.getCpMultiplier();
        }

        this.compositeDEF = function( iv ) {
           // iv = iv || this.IVs.DEF;
           return ( this.p.Defense + iv ) * this.getCpMultiplier();
        }

        this.getCp = function( sta, att, def ) {
          return Math.max( 10, Math.floor( 0.1 * Math.pow( this.compositeSTA( sta ), 0.5 ) * this.compositeATT( att ) * Math.pow( this.compositeDEF( def ), 0.5 ) ) );
        }

        this.getHp = function( sta ) {
          return Math.max( 10, Math.floor( this.compositeSTA( sta ) ) ); 
        }

        this.getCpMultiplier = function() {
            return utils.findByKey(this.cpMultipliers, this.p.level, "Level").CpMultiplier;
        }
      
        this.checkTrainerInfo = function( att, def, sta, answer1, answer2 ) {
  
          if (this.p.hasMaxATK == "" && this.p.hasMaxDEF == "" && this.p.hasMaxSTA == ""){
            return true;
          }

          var IVpercentaje = this.calcIVPercentaje( att, def, sta);

          if (this.checkAnswer1(answer1, IVpercentaje)){

            var maxIV = Math.max( att, def, sta);
            if (this.checkAnswer2(answer2, maxIV)){

              if ((this.p.hasMaxATK && (att < maxIV)) || (!this.p.hasMaxATK && ( att >= maxIV)) )
              return false;
              if ((this.p.hasMaxDEF && (def < maxIV)) || (!this.p.hasMaxDEF && ( def >= maxIV)))
              return false;
              if ((this.p.hasMaxSTA && (sta < maxIV)) || (!this.p.hasMaxSTA && ( sta >= maxIV)))
              return false;

              return true;
            }
          }
        }

        this.calcIVPercentaje = function( att, def, sta) {
          return Math.floor( (att + def + sta) / 45 * 100 );
        }

        this.checkAnswer1 = function(answerLevel, IVpercentaje){
          switch (answerLevel) {
              case 1:
                  if (IVpercentaje >= 80)
                    return true;
                  return false;
                  break;
              case 2:
                  if ((IVpercentaje >= 64) && (IVpercentaje <= 80))
                    return true;
                  return false;
                  break;
              case 3:
                  if ((IVpercentaje >= 50) && (IVpercentaje <= 64))
                    return true;
                  return false;
                  break;
              case 4:
                  if (IVpercentaje <= 50)
                    return true;
                  return false;
                  break;
              default:
                    return true;
                  break;
          }
        }

        this.checkAnswer2 = function(answerLevel, maxIV){
          switch (answerLevel) {
              case 1:
                  if (maxIV == 15)
                    return true;
                  return false;
                  break;
              case 2:
                  if ((maxIV >= 13) && (maxIV <= 14))
                    return true;
                  return false;
                  break;
              case 3:
                  if ((maxIV >= 8) && (maxIV <= 12))
                    return true;
                  return false;
                  break;
              case 4:
                  if (maxIV <= 7)
                    return true;
                  return false;
                  break;
              default:
                    return true;
                  break;
          }
        }

        this.checkPrevData = function( att, def, sta ) {
          if ( ! this.p.prevData ) {
            return true; 
          }

          for ( var i = 0; i < this.p.prevData.length; i++ ) {
            var c = this.p.prevData[i];
            if ( this.p.level == c.level + 0.5 && att == c.ATT && def == c.DEF && sta == c.STA ) {
              return true; 
            }
          }

          return false;
        }

})

;
