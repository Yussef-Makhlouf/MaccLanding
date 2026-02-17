import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: locale === 'ar'
            ? 'الوظائف | MACC'
            : 'Careers | MACC',
        description: locale === 'ar'
            ? 'انضم لفريق MACC - فرص عمل متميزة في مجال إدارة المرافق'
            : 'Join MACC team - Excellent career opportunities in facility management',
        openGraph: {
            title: locale === 'ar' ? 'الوظائف | MACC' : 'Careers | MACC',
            description: locale === 'ar' ? 'فرص عمل متميزة' : 'Excellent career opportunities',
            type: 'website',
            locale: locale === 'ar' ? 'ar_SA' : 'en_US',
        },
        alternates: {
            languages: {
                'ar': '/ar/career',
                'en': '/en/career',
            },
        },
    };
}