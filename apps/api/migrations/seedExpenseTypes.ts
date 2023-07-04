import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTipoGastoTable1600000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO expense_type (name) VALUES
        ('Alimentación'),
        ('Transporte'),
        ('Vivienda'),
        ('Entretenimiento'),
        ('Compras'),
        ('Salud'),
        ('Educación'),
        ('Servicios públicos'),
        ('Viajes'),
        ('Seguros'),
        ('Ahorros'),
        ('Otros')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM expense_type');
  }
}
