// e2e/registro.spec.ts
import { test } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage'; //se importa la clase

test.describe('Módulo de Registro - Talento Tech', () => {

    test('CP01 - Registro de usuario exitoso con datos dinámicos', async ({ page }) => {

        const registerPage = new RegisterPage(page);

        const emailDinamico = `anto.qa_${Date.now()}@gmail.com`;

        await registerPage.navegar();
        await registerPage.completarFormulario('Erika', 'Antonella', emailDinamico, 'Anto234bfd', 'fullstack-9-meses.pdf');
        await registerPage.verificarRegistroExitoso();
    });


    test('CP02 - registro de usuario con campos vacios', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navegar();
        await registerPage.hacerClicEnRegistrarse();
    })

});