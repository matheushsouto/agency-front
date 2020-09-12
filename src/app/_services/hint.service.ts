import * as introJs from 'intro.js/intro';

export class HintService {

    static show(steps) {
        const intro = introJs();
        intro
            .setOption('nextLabel', 'Próximo')
            .setOption('prevLabel', 'Voltar')
            .setOption('skipLabel', 'Fechar')
            .setOption('doneLabel', 'Fechar');

        intro.setOptions({
            steps: steps
        });

        intro.start();
    }
}
