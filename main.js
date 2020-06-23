new Vue({
    el:'#app',
    data:{
        play: true,
        playerLife: 100,
        monsterLife: 100,
        desistiu: 0,
        logs: []
    },
    methods:{
        reiniciar(){
            this.play = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.desistiu = 0;
            this.logs = [];
        },
        ataque() {
            const playerAtk = this.damage(7, 'JOGADOR', 'MONSTRO', 'player');
            this.monsterLife -= playerAtk;
            if (this.monsterLife > 0){
                const monsterAtk = this.damage(9, 'MONSTRO', 'JOGADOR', 'monster');
                this.playerLife -= monsterAtk;
            }
            if(this.playerLife <= 0){
                this.playerLife = 0;
            }
            if(this.monsterLife <= 0){
                this.monsterLife = 0;
            }
            if(this.playerLife <= 0 || this.monsterLife <= 0){
                this.play = false;
            }
        },
        especial(){
            const playerAtk = this.especialDamage(15);
            const monsterAtk = this.damage(9, 'MONSTRO', 'JOGADOR', 'monster');
            this.monsterLife -= playerAtk;
            this.playerLife -= monsterAtk;
            if(this.playerLife <= 0){
                this.playerLife = 0;
            }
            if(this.monsterLife <= 0){
                this.monsterLife = 0;
            }
            if(this.playerLife <= 0 || this.monsterLife <= 0){
                this.play = false;
            }
        },
        curar(){
            if(this.playerLife < 100){
                const playerAtk = this.heal(20);
                const monsterAtk = this.damage(9,'MONSTRO', 'JOGADOR', 'monster');
                this.playerLife += playerAtk;
                this.playerLife -= monsterAtk;
                if(this.playerLife > 100){
                    this.playerLife=100;
                }
            }
        },
        heal(b){
            const cura = Math.round(Math.random()*b)+5;
            this.registerLog(`JOGADOR se curou em ${cura}.`, 'heal');
            return cura;
        },
        especialDamage(a, cls){
            const dano = Math.round(Math.random()*a)+5;
            this.registerLog(`JOGADOR atingiu MONSTRO, com um ataque especial, dando ${dano} de dano.`, 'especial');
            return dano;
        },
        damage(a, fonte, alvo, cls){
            const dano = Math.round(Math.random()*a)+5;
            this.registerLog(`${fonte} atingiu ${alvo} dando ${dano} de dano.`, cls);
            return dano;
        },
        desistir(){
            this.play = false;
            this.desistiu = 1;
        },
        registerLog(text, cls){
            this.logs.unshift({text, cls});
        }
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    watch:{

    }
})