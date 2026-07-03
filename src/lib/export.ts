import { EcoBrickOutput } from './simulation/types';

const downloadFile = (content: string, filename: string, mimeType: string) => {
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportEcoBrickData = (result: EcoBrickOutput) => {
    const rows = [
        ['ECO-BRICK SIMULATOR - Laporan Simulasi Material'],
        ['Green Scientific Competition (GSC) 2026'],
        ['Tanggal', new Date().toLocaleDateString('id-ID')],
        [''],
        ['=== KOMPOSISI INPUT (kg per 100 ton solid) ==='],
        ['Limbah Tailing', result.inputComposition.tailingKg.toString(), 'kg'],
        ['Semen Portland', result.inputComposition.cementKg.toString(), 'kg'],
        ['Pasir Silika', result.inputComposition.sandKg.toString(), 'kg'],
        ['Air (Water)', result.inputComposition.waterKg.toString(), 'kg'],
        ['Eco-Admixture', result.inputComposition.admixtureKg.toString(), 'kg'],
        [''],
        ['=== SPESIFIKASI MATERIAL ECO-BRICK ==='],
        ['Kuat Tekan', result.compressiveStrengthMPa.toString(), 'MPa'],
        ['Daya Serap Air (Porositas)', result.waterAbsorptionPercent.toString(), '%'],
        ['Densitas / Kepadatan', result.densityKgM3.toString(), 'kg/m³'],
        ['Status SNI 03-0349-1989', result.isSNICompliant ? 'LULUS' : 'GAGAL', '-'],
        [''],
        ['=== DIMENSI & GEOMETRI ==='],
        ['Panjang', result.dimensions.lengthCm.toString(), 'cm'],
        ['Lebar', result.dimensions.widthCm.toString(), 'cm'],
        ['Tinggi', result.dimensions.heightCm.toString(), 'cm'],
        ['Berat per Unit', result.dimensions.weightKg.toString(), 'kg'],
        ['Volume Total', result.dimensions.volumeM3.toString(), 'm³'],
        ['Volume Solid', result.dimensions.solidVolumeM3.toString(), 'm³'],
        [''],
        ['=== DAMPAK SDGs & INFRASTRUKTUR (Harian) ==='],
        ['Produksi Eco-Brick', result.totalBricksProduced.toString(), 'pcs/hari'],
        ['Limbah Tailing Terdaur Ulang', result.recycledWasteTons.toString(), 'ton/hari'],
        ['Reduksi Jejak Karbon', result.carbonReductionKg.toString(), 'kg CO2e/hari'],
        ['Potensi Luas Dinding', result.applicableInfrastructureArea.wallSqm.toString(), 'm²/hari'],
        ['Potensi Luas Trotoar', result.applicableInfrastructureArea.sidewalkSqm.toString(), 'm²/hari'],
        [''],
        ['=== ANALISIS SENSITIVITAS (Variasi Kandungan Semen) ==='],
        ['Semen (%)', 'Kuat Tekan (MPa)', 'Porositas (%)', 'Densitas (kg/m³)', 'Lulus SNI']
    ];

    // Add sensitivity data rows
    result.sensitivityData.forEach(d => {
        rows.push([
            d.cementPercent.toString(),
            d.compressiveStrengthMPa.toString(),
            d.waterAbsorptionPercent.toString(),
            d.densityKgM3.toString(),
            d.isSNICompliant ? 'Ya' : 'Tidak'
        ]);
    });

    const csv = rows.map(row => row.join(',')).join('\n');
    downloadFile(csv, `EcoBrick_Report_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
};
