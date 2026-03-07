import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './MySkeleton.module.css'

type Props = {
  count: number
}

export const MySkeleton = ({ count }: Props) => {
  return (
    <Skeleton containerClassName={s.skeleton} count={count} width={'180px'} height={'270px'} borderRadius={'8px'} />
  )
}
