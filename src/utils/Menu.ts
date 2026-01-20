/**
 * Classe gérant les interactions avec l'utilisateur via la ligne de commande
 * Fournit des méthodes sécurisées et récursives pour les saisies
 * Adapté pour Deno via prompt()
 */
export class Menu {
  constructor() {}

  /**
   * Pose une question textuelle à l'utilisateur
   * @param question La question à poser
   * @returns Promise contenant la réponse
   */
  public async ask(question: string): Promise<string> {
    const answer = prompt(question);
    return (answer ?? '').trim();
  }

  /**
   * Demande un nombre dans une plage définie (avec validation récursive)
   * @param question La question à poser
   * @param min Valeur minimum (inclusive)
   * @param max Valeur maximum (inclusive)
   * @returns Promise contenant le nombre valide
   */
  public async askNumber(question: string, min: number, max: number): Promise<number> {
    const answer = await this.ask(question);
    const num = parseInt(answer, 10);

    if (isNaN(num) || num < min || num > max) {
      console.log(`❌ Veuillez entrer un nombre entre ${min} et ${max}.`);
      return this.askNumber(question, min, max); // Récursion jusqu'à valeur valide
    }

    return num;
  }

  /**
   * Affiche une liste d'options numérotées
   * @param options Tableau d'options à afficher
   */
  public display(options: string[]): void {
    console.log('\n');
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    console.log('');
  }

  /**
   * Affiche des options et demande à l'utilisateur de choisir (avec validation)
   * @param options Tableau d'options
   * @returns Promise contenant l'index de l'option choisie (0-based)
   */
  public async selectOption(options: string[]): Promise<number> {
    this.display(options);
    const choice = await this.askNumber('Votre choix : ', 1, options.length);
    return choice - 1; // Retourne l'index 0-based
  }

  /**
   * Affiche un titre stylisé
   * @param title Le titre à afficher
   */
  public displayTitle(title: string): void {
    const line = '='.repeat(title.length + 4);
    console.log(`\n${line}`);
    console.log(`  ${title}  `);
    console.log(`${line}\n`);
  }

  /**
   * Affiche un message et attend que l'utilisateur appuie sur Entrée
   */
  public async pressEnterToContinue(): Promise<void> {
    await this.ask('\nAppuyez sur Entrée pour continuer...');
  }

  /**
   * Pose une question fermée oui/non
   */
  public async askYesNo(question: string): Promise<boolean> {
    const answer = (await this.ask(`${question} (o/n) `)).toLowerCase();
    if (answer === 'o' || answer === 'oui' || answer === 'y') return true;
    if (answer === 'n' || answer === 'non') return false;
    console.log('❌ Répondez par o/oui ou n/non.');
    return this.askYesNo(question);
  }

  /**
   * Ferme l'interface (pour compatibilité, ne fait rien dans Deno)
   */
  public close(): void {
    // Rien à faire avec Deno
  }
}
