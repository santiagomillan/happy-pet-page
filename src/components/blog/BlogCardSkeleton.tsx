import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <Card className="border-border overflow-hidden">
      <Skeleton className="w-full aspect-video" />
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full mb-3" />
        <Skeleton className="w-3/4 h-6 mb-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-2/3 h-4 mb-4" />
        <Skeleton className="w-24 h-4" />
      </CardContent>
    </Card>
  );
};

export default BlogCardSkeleton;
