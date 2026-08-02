import type { Metadata } from "next";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { PageHeader } from "@/components/Section";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Çakır Lojistik'in kişisel verileri işleme ve saklama esasları hakkında bilgilendirme.",
};

export default function GizlilikPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        description="Bu sayfa, sitemiz üzerinden ilettiğiniz bilgilerin nasıl işlendiğini açıklar."
      />

      <section className="shell py-20 lg:py-28">
        <Reveal>
          <Prose>
            <p>
              <strong>Not:</strong> Aşağıdaki metin bir çerçeve taslağıdır.
              Yayına almadan önce şirketinizin fiili veri işleme
              uygulamalarına göre bir hukuk danışmanıyla birlikte
              düzenlenmelidir.
            </p>

            <h2>Toplanan bilgiler</h2>
            <p>
              Site üzerindeki teklif formu aracılığıyla ad soyad, telefon
              numarası, e-posta adresi ve talebinize ilişkin serbest metin
              bilgisi tarafımıza iletilir. Bu alanların dışında otomatik
              olarak toplanan bir kişisel veri bulunmamaktadır.
            </p>

            <h2>Kullanım amacı</h2>
            <p>
              İletilen bilgiler yalnızca talebinize yanıt vermek, fiyat teklifi
              hazırlamak ve taşıma sürecini yürütmek amacıyla kullanılır.
              Pazarlama amaçlı ileti gönderimi için ayrıca onayınız alınır.
            </p>

            <h2>Paylaşım</h2>
            <p>
              Bilgileriniz, hizmetin yürütülmesi için zorunlu olan haller ve
              yasal yükümlülükler dışında üçüncü kişilerle paylaşılmaz,
              satılmaz veya devredilmez.
            </p>

            <h2>Saklama süresi</h2>
            <p>
              Veriler, ilgili mevzuatta öngörülen süreler boyunca saklanır ve
              sürenin sonunda silinir veya anonim hâle getirilir.
            </p>

            <h2>Haklarınız</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
              verilerinize erişme, düzeltilmesini veya silinmesini isteme
              haklarına sahipsiniz. Taleplerinizi{" "}
              <a href={contact.email.href}>{contact.email.label}</a> adresine
              iletebilirsiniz.
            </p>

            <h2>İletişim</h2>
            <p>
              {site.legalName} — <a href={contact.email.href}>{contact.email.label}</a>
              , <a href={contact.phone.href}>{contact.phone.label}</a>
            </p>
          </Prose>
        </Reveal>
      </section>
    </>
  );
}
