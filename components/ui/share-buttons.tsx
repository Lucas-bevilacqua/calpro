'use client'

import { Button } from '@/components/ui/button'
import {
    Facebook,
    Linkedin,
    Twitter,
    Link as LinkIcon,
    MessageCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonsProps {
    url?: string
    title?: string
    description?: string
}

export function ShareButtons({
    url,
    title = 'CalcPro.br - Calculadoras Profissionais',
    description = 'Confira esta calculadora gratuita!'
}: ShareButtonsProps) {

    const getUrl = () => {
        if (typeof window !== 'undefined') {
            return url || window.location.href
        }
        return ''
    }

    const handleShare = (platform: string) => {
        const currentUrl = getUrl()
        const text = `${title} - ${description}`

        let shareUrl = ''

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${currentUrl}`)}`
                break
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
                break
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`
                break
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
                break
            case 'copy':
                navigator.clipboard.writeText(currentUrl)
                toast.success('Link copiado para a área de transferência!')
                return
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <div className="flex flex-col gap-3 p-6 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Compartilhe esta ferramenta
            </h3>
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                    onClick={() => handleShare('whatsapp')}
                    title="Compartilhar no WhatsApp"
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">WhatsApp</span>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
                    onClick={() => handleShare('linkedin')}
                    title="Compartilhar no LinkedIn"
                >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors"
                    onClick={() => handleShare('twitter')}
                    title="Compartilhar no Twitter"
                >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
                    onClick={() => handleShare('facebook')}
                    title="Compartilhar no Facebook"
                >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors"
                    onClick={() => handleShare('copy')}
                    title="Copiar Link"
                >
                    <LinkIcon className="h-5 w-5" />
                    <span className="sr-only">Copiar Link</span>
                </Button>
            </div>
        </div>
    )
}
