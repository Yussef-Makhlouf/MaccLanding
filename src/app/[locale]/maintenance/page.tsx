import Maintenance from "@/components/layout/Maintenance";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <Maintenance locale={locale} />;
}
