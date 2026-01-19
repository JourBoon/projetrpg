export class contact {
    
    nom: string;
    prenom: string;
    num: string;

    constructor(nom : string, prenom: string, num: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.num = num;
    }

    display(): void {
        console.log("Nom : "+ this.nom+ " , Prénom : " + this.prenom + " , Numéro : " +  this.num);
    }
}

const cont1 = new contact("Dupont","Jean","0123456789");

const cont2 = new contact("Garcia","Thomas","0987654321");

const cont3 = new contact("Tamisier","Elia","0147258369");

const cont4 = new contact("Pierret","Sophie","0172638459");

const agenda: contact[] = [cont1, cont2, cont3, cont4];

for (let i = 0; i < agenda.length; i++) {
    agenda[i].display();
}