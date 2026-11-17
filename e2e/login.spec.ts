import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
//PA-01: prueba automatizada 1
//CP01: caso de prueba 1

test.describe('Módulo de autenticación - ticket PA-01', () => {

    test('PA-01: CP01 - login exitoso con credenciales validas', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const emailUnico = `test_${Date.now()}@gmail.com`;
        const passwordValida = `Pass_${Date.now()}!`;

        await registerPage.navegarRegistro();
        await registerPage.completarFormulario('Test', 'User', emailUnico, passwordValida, 'fullstack-9-meses.pdf');

        await expect(page).toHaveURL(/.*login\.html/, { timeout: 10000 });
        await loginPage.iniciarSesion(emailUnico, passwordValida);
        await expect(page).toHaveURL(/.*profile\.html/, { timeout: 10000 });
    });

    test('PA-01: CP02 - login fallido con usuario inexistente', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navegarLogin();

        const emailInexistente = `noexiste_${Date.now()}@gmail.com`;
        const passwordErronea = `ClaveFalsa_${Date.now()}!`;

        await loginPage.iniciarSesion(emailInexistente, passwordErronea);

        //verificacion del toast con el texto esperado
        await expect(loginPage.toastError).toBeVisible({ timeout: 10000 });
        await expect(loginPage.toastError).toContainText(/credenciales inv[aá]lidas/i);

        //verificacion de que no ingresa al perfil
        await expect(page).not.toHaveURL(/profile\.html/);

    });


    test('PA-01: CP03 - login fallido con password inválida', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        const emailUnico = `test_${Date.now()}@gmail.com`;
        const passwordValida = `Pass_${Date.now()}!`;

        await registerPage.navegarRegistro();
        await registerPage.completarFormulario('Test', 'User', emailUnico, passwordValida, 'fullstack-9-meses.pdf');

        await expect(page).toHaveURL(/.*login\.html/, { timeout: 10000 });
        await loginPage.iniciarSesion(emailUnico, 'PassInvalida123');

        //verificacion del toast con el texto esperado
        await expect(loginPage.toastError).toBeVisible({ timeout: 10000 });
        await expect(loginPage.toastError).toContainText(/credenciales inv[aá]lidas/i);

        //verificacion de que no ingresa al perfil
        await expect(page).not.toHaveURL(/profile\.html/);
    });


    test('PA-01: CP04 - login fallido por campos vacios', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navegarLogin();
        await loginPage.iniciarSesion();

        // lee el mensaje nativo de validación del input de email
        const mensajeValidacion = await loginPage.emailInput.evaluate(
            (input: HTMLInputElement) => input.validationMessage
        );

        await expect(mensajeValidacion).toMatch(/fill out|completa/i);

        await expect(page).not.toHaveURL(/profile\.html/);
    });
})