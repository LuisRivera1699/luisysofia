import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const NUM_QRS = 20;
const BASE_DIR = path.join(__dirname, 'qrs');

// Función principal
async function generateQRCodes() {
  try {
    // Crear directorio base si no existe
    if (!fs.existsSync(BASE_DIR)) {
      fs.mkdirSync(BASE_DIR, { recursive: true });
      console.log(`✓ Directorio creado: ${BASE_DIR}`);
    }

    console.log(`\n🚀 Generando ${NUM_QRS} códigos QR...\n`);

    // Generar QR codes
    for (let i = 1; i <= NUM_QRS; i++) {
      // Generar UUID único
      const uuid = uuidv4();

      // Crear carpeta para este QR
      const qrDir = path.join(BASE_DIR, i.toString());
      if (!fs.existsSync(qrDir)) {
        fs.mkdirSync(qrDir, { recursive: true });
      }

      // Rutas de los archivos
      const svgPath = path.join(qrDir, 'qr.svg');
      const txtPath = path.join(qrDir, 'uuid.txt');

      // Generar QR en formato SVG
      const svgString = await QRCode.toString(uuid, {
        type: 'svg',
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 300
      });

      // Guardar SVG
      fs.writeFileSync(svgPath, svgString);

      // Guardar UUID en archivo de texto
      fs.writeFileSync(txtPath, uuid);

      console.log(`✓ QR ${i}/${NUM_QRS} generado`);
      console.log(`  └─ Carpeta: ${qrDir}`);
      console.log(`  └─ UUID: ${uuid}\n`);
    }

    console.log(`\n🎉 ¡Proceso completado! Se generaron ${NUM_QRS} códigos QR en la carpeta 'qrs'\n`);

  } catch (error) {
    console.error('❌ Error al generar códigos QR:', error);
    process.exit(1);
  }
}

// Ejecutar
generateQRCodes();

