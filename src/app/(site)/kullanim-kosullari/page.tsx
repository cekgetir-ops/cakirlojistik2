import type { Metadata } from "next";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { PageHeader } from "@/components/Section";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description:
    "Bu web sitesinin kullanımına ve hizmet ilişkisine dair genel koşullar.",
};

export default function KullanimKosullariPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title="Kullanım Koşulları"
        description="Bu sayfa, siteyi kullanırken ve hizmet alırken geçerli olan genel çerçeveyi tanımlar."
      />

      <section className="shell py-20 lg:py-28">
        <Reveal>
          <Prose>
            <p>
              <strong>Not:</strong> Aşağıdaki metin bir çerçeve taslağıdır.
              Yayına almadan önce fiili hizmet sözleşmenizle uyumlu hâle
              getirilmeli ve bir hukuk danışmanına kontrol ettirilmelidir.
            </p>

            <h2>Kapsam</h2>
            <p>
              Bu koşullar, {site.legalName} tarafından işletilen web sitesinin
              kullanımını düzenler. Siteyi kullanarak bu koşulları kabul etmiş
              sayılırsınız.
            </p>

            <h2>Site içeriği</h2>
            <p>
              Sitedeki hizmet açıklamaları, süre ve fiyat bilgileri
              bilgilendirme amaçlıdır ve bağlayıcı teklif niteliği taşımaz.
              Bağlayıcı teklif, tarafınıza yazılı olarak iletilen fiyat
              bildirimidir.
            </p>

            <h2>Teklif formu</h2>
            <p>
              Form üzerinden ilettiğiniz bilgilerin doğruluğundan siz
              sorumlusunuz. Eksik veya hatalı bilgi, verilen fiyatın ve teslim
              süresinin değişmesine yol açabilir.
            </p>

            <h2>Sorumluluk</h2>
            <p>
              Taşıma sürecine ilişkin hak ve yükümlülükler, taraflar arasında
              imzalanan taşıma sözleşmesi ve teslim tutanakları ile belirlenir.
              Sigorta kapsamı ilgili poliçe hükümlerine tabidir.
            </p>

            <h2>Fikri mülkiyet</h2>
            <p>
              Sitedeki metin, görsel ve tasarım ögeleri {site.name}&apos;a
              aittir; izinsiz kopyalanamaz ve çoğaltılamaz.
            </p>

            <h2>Değişiklikler</h2>
            <p>
              Bu koşullar önceden bildirim yapılmaksızın güncellenebilir.
              Güncel sürüm bu sayfada yayımlanır.
            </p>

            <h2>İletişim</h2>
            <p>
              Sorularınız için{" "}
              <a href={contact.email.href}>{contact.email.label}</a> adresine
              yazabilir ya da{" "}
              <a href={contact.phone.href}>{contact.phone.label}</a> numarasını
              arayabilirsiniz.
            </p>
          </Prose>
        </Reveal>
      </section>
    </>
  );
}
