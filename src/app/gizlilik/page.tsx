import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GizlilikPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
          <p className="text-sm text-gray-400 mb-8">Son güncelleme: Haziran 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">1. Toplanan Veriler</h2>
              <p>YatırımSahası, platforma kayıt sırasında ad, e-posta, telefon ve (müteahhitler için) firma bilgileri toplar. Talep formlarında ise anonim konum ve bütçe tercihleri kaydedilir.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">2. Verilerin Kullanımı</h2>
              <p>Toplanan veriler yalnızca platform hizmetlerinin sunulması amacıyla kullanılır. Alıcı kimlikleri hiçbir zaman müteahhitlerle paylaşılmaz; müteahhitler yalnızca anonim toplu istatistik görür.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">3. Ödeme Bilgileri</h2>
              <p>Platform herhangi bir ödeme işlemine aracılık etmez. Alıcı-satıcı ödemeleri doğrudan taraflar arasında gerçekleşir. Platform bu işlemlere ilişkin finansal veri tutmaz.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">4. Çerezler</h2>
              <p>Oturum yönetimi için zorunlu çerezler kullanılır. Üçüncü taraf reklam çerezi kullanılmaz.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-2">5. İletişim</h2>
              <p>Gizlilik konularında <a href="mailto:gizlilik@yatirim-sahasi.com" className="text-emerald-600 hover:underline">gizlilik@yatirim-sahasi.com</a> adresine ulaşabilirsiniz.</p>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mt-8">
              Bu platform demo amaçlıdır. Buradaki gizlilik metni örnek niteliğindedir.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
