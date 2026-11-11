import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

test.describe('Módulo de autenticación - ticket PA-01', () => {

    test('PA-01: CP01 - login exitoso con credenciales validas', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const emailUnico = `test_${Date.now()}@gmail.com`;
        const passwordValida = 'Clavesegura123';

        await loginPage.navegarRegistro();
        await registerPage.completarFormulario('Test', 'User', emailUnico, passwordValida, 'fullstack-9-meses.pdf');

        await expect(page).toHaveURL(/.*login\.html/, { timeout: 10000 });
        await loginPage.iniciarSesion(emailUnico, passwordValida);
        await expect(page).toHaveURL(/.*profile\.html/, { timeout: 10000 });
    });
})