import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KullanimKosullariPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kullanım Koşulları</h1>
          <p className="text-sm text-gray-400 mb-8">Son güncelleme: Haziran 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">1. Hizmetin Kapsamı</h2>
              <p>YatırımSahası, müteahhit firmalar ile alıcılar/yatırımcılar arasında proje listeleme ve talep eşleştirme hizmeti sunar. Platform herhangi bir gayrimenkul işlemine taraf değildir.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">2. Ödeme ve Komisyon</h2>
              <p>Platform alıcı-satıcı arasındaki ödemelere aracılık etmez. Platformun tek gelir kaynağı müteahhit firmalardan alınan abonelik ücretidir. Alıcılar için platform tamamen ücretsizdir.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">3. Müteahhit Sorumlulukları</h2>
              <p>Müteahhitler, yayınladıkları proje bilgilerinin doğruluğundan sorumludur. Yanıltıcı ilan yayınlama hesap askıya alınmasına yol açar.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">4. Talep Formu</h2>
              <p>Alıcı talep formu bir "bildirim aboneliği"dir; satın alma taahhüdü oluşturmaz. Müteahhitler alıcı kimliklerini göremez.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">5. Hesap İptali</h2>
              <p>Her kullanıcı hesabını dilediği zaman silebilir. Müteahhit hesabı iptalinde aktif ilanlar otomatik olarak yayından kaldırılır.</p>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mt-8">
              Bu platform demo amaçlıdır. Buradaki kullanım koşulları örnek niteliğindedir.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
